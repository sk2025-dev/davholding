<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\RdvController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BeautyServiceController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PromoSlideController;
use App\Http\Controllers\ConsultingRealisationController;
use App\Http\Controllers\ConsultingHeroSlideController;
use App\Http\Controllers\ConsultingSectionImageController;
use App\Http\Controllers\DeliveryZoneController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'DAVGROUP API',
        'endpoints' => [
            'GET /api/categories',
            'GET /api/products',
            'GET /api/products/{id}',
            'POST /api/login',
            'POST /api/logout',
            'GET /api/user',
            'GET /api/rdv',
            'POST /api/rdv',
        ],
    ]);
});

// IPN PayDunya (webhooks publics)
Route::post('/payment/ipn',          [PaymentController::class, 'ipn']);
Route::post('/payment/verify',       [PaymentController::class, 'verify']);
Route::post('/payment/sync-pending', [PaymentController::class, 'syncPending']);
Route::post('/rdv/ipn',     [RdvController::class,     'ipn']);

// Créneaux disponibles (public — pas besoin d'être connecté pour voir)
Route::get('/rdv/slots', [RdvController::class, 'availableSlots']);
// Détail RDV après paiement (public)
Route::get('/rdv/booking/{id}', [RdvController::class, 'show']);

Route::post('/contact', [ContactController::class, 'send']);

Route::post('/login',           [AuthController::class, 'login']);
Route::post('/register',        [AuthController::class, 'register']);
Route::post('/forgot-password', [PasswordResetController::class, 'forgotPassword']);
Route::post('/reset-password',  [PasswordResetController::class, 'resetPassword']);
Route::get('/auth/google', [SocialAuthController::class, 'redirect']);
Route::get('/auth/google/callback', [SocialAuthController::class, 'callback']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/beauty-services', [BeautyServiceController::class, 'index']);

// Promos — routes publiques
Route::get('/promos/bar',      [PromoController::class, 'promoBar']);
Route::get('/promos/active',   [PromoController::class, 'active']);
Route::post('/promos/validate',[PromoController::class, 'validate']);

// Promo slides — public
Route::get('/promo-slides', [PromoSlideController::class, 'index']);

// Réalisations Consulting — public
Route::get('/consulting-realisations', [ConsultingRealisationController::class, 'index']);

// Carrousel héro Consulting — public
Route::get('/consulting-hero-slides', [ConsultingHeroSlideController::class, 'index']);

// Photos des sections "Ce que nous faisons" Consulting — public
Route::get('/consulting-section-images', [ConsultingSectionImageController::class, 'index']);

// Communes de livraison — public
Route::get('/delivery-zones', [DeliveryZoneController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout',           [AuthController::class, 'logout']);
    Route::get('/user',              [AuthController::class, 'user']);
    Route::put('/user/profile',      [AuthController::class, 'updateProfile']);
    Route::put('/user/password',     [AuthController::class, 'changePassword']);

    // Réalisations Consulting — admin (compte DAVConsulting scopé, ou admin DAVGROUP)
    Route::middleware('ability:consulting')->group(function () {
        Route::post('/consulting-realisations', [ConsultingRealisationController::class, 'store']);
        Route::match(['put', 'post'], '/consulting-realisations/{consultingRealisation}', [ConsultingRealisationController::class, 'update']);
        Route::delete('/consulting-realisations/{consultingRealisation}', [ConsultingRealisationController::class, 'destroy']);

        Route::post('/consulting-hero-slides', [ConsultingHeroSlideController::class, 'store']);
        Route::match(['put', 'post'], '/consulting-hero-slides/{consultingHeroSlide}', [ConsultingHeroSlideController::class, 'update']);
        Route::delete('/consulting-hero-slides/{consultingHeroSlide}', [ConsultingHeroSlideController::class, 'destroy']);

        Route::match(['put', 'post'], '/consulting-section-images/{sectionKey}', [ConsultingSectionImageController::class, 'update']);
        Route::delete('/consulting-section-images/{sectionKey}', [ConsultingSectionImageController::class, 'destroy']);
    });

    // Tout ce qui suit est réservé à l'admin DAVGROUP (Beauté / e-commerce)
    Route::middleware('ability:manage-davgroup')->group(function () {
        Route::post('/payment/initiate',        [PaymentController::class, 'initiate']);
        Route::post('/payment/mobile-initiate', [PaymentController::class, 'mobileInitiate']);
        Route::get('/orders/my',         [OrderController::class, 'myOrders']);
        Route::get('/rdv/my',            [RdvController::class,   'myRdvs']);
        Route::get('/rdv', [RdvController::class, 'index']);
        Route::post('/rdv', [RdvController::class, 'store']);
        Route::patch('/rdv/{rdv}/status', [RdvController::class, 'updateStatus']);
        Route::get('/rdv/notifications',  [RdvController::class, 'notifications']);
        Route::post('/rdv/mark-notified', [RdvController::class, 'markNotified']);
        Route::post('/beauty-services', [BeautyServiceController::class, 'store']);
        Route::match(['put', 'post'], '/beauty-services/{beautyService}', [BeautyServiceController::class, 'update']);
        Route::delete('/beauty-services/{beautyService}', [BeautyServiceController::class, 'destroy']);

        // Promos — admin
        Route::get('/promos',                                    [PromoController::class, 'index']);
        Route::post('/promos',                                   [PromoController::class, 'store']);
        Route::match(['put', 'post'], '/promos/{promo}',         [PromoController::class, 'update']);
        Route::delete('/promos/{promo}',                         [PromoController::class, 'destroy']);
        Route::post('/promos/bar',                               [PromoController::class, 'savePromoBar']);

        Route::get('/orders',                    [OrderController::class, 'index']);
        Route::get('/orders/{order}',            [OrderController::class, 'show']);
        Route::patch('/orders/{order}/status',   [OrderController::class, 'updateStatus']);
        Route::post('/orders/delivery',          [OrderController::class, 'storeDelivery']);
        Route::post('/products', [ProductController::class, 'store']);
        Route::match(['put', 'post'], '/products/{product}', [ProductController::class, 'update']);
        Route::delete('/products/{product}', [ProductController::class, 'destroy']);

        // Promo slides — admin
        Route::post('/promo-slides', [PromoSlideController::class, 'store']);
        Route::match(['put', 'post'], '/promo-slides/{promoSlide}', [PromoSlideController::class, 'update']);
        Route::delete('/promo-slides/{promoSlide}', [PromoSlideController::class, 'destroy']);

        // Communes de livraison — admin
        Route::post('/delivery-zones', [DeliveryZoneController::class, 'store']);
        Route::match(['put', 'post'], '/delivery-zones/{deliveryZone}', [DeliveryZoneController::class, 'update']);
        Route::delete('/delivery-zones/{deliveryZone}', [DeliveryZoneController::class, 'destroy']);
    });
});
