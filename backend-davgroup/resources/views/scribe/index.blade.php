<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>Dav'Beauté API Documentation</title>

    <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="{{ asset("/vendor/scribe/css/theme-default.style.css") }}" media="screen">
    <link rel="stylesheet" href="{{ asset("/vendor/scribe/css/theme-default.print.css") }}" media="print">

    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>

    <link rel="stylesheet"
          href="https://unpkg.com/@highlightjs/cdn-assets@11.6.0/styles/obsidian.min.css">
    <script src="https://unpkg.com/@highlightjs/cdn-assets@11.6.0/highlight.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jets/0.14.1/jets.min.js"></script>

    <style id="language-style">
        /* starts out as display none and is replaced with js later  */
                    body .content .bash-example code { display: none; }
                    body .content .javascript-example code { display: none; }
            </style>

    <script>
        var tryItOutBaseUrl = "http://127.0.0.1:8000";
        var useCsrf = Boolean();
        var csrfUrl = "/sanctum/csrf-cookie";
    </script>
    <script src="{{ asset("/vendor/scribe/js/tryitout-5.11.0.js") }}"></script>

    <script src="{{ asset("/vendor/scribe/js/theme-default-5.11.0.js") }}"></script>

</head>

<body data-languages="[&quot;bash&quot;,&quot;javascript&quot;]">

<a href="#" id="nav-button">
    <span>
        MENU
        <img src="{{ asset("/vendor/scribe/images/navbar.png") }}" alt="navbar-image"/>
    </span>
</a>
<div class="tocify-wrapper">
    
            <div class="lang-selector">
                                            <button type="button" class="lang-button" data-language-name="bash">bash</button>
                                            <button type="button" class="lang-button" data-language-name="javascript">javascript</button>
                    </div>
    
    <div class="search">
        <input type="text" class="search" id="input-search" placeholder="Search">
    </div>

    <div id="toc">
                    <ul id="tocify-header-introduction" class="tocify-header">
                <li class="tocify-item level-1" data-unique="introduction">
                    <a href="#introduction">Introduction</a>
                </li>
                            </ul>
                    <ul id="tocify-header-authentification" class="tocify-header">
                <li class="tocify-item level-1" data-unique="authentification">
                    <a href="#authentification">Authentification</a>
                </li>
                            </ul>
                    <ul id="tocify-header-endpoints" class="tocify-header">
                <li class="tocify-item level-1" data-unique="endpoints">
                    <a href="#endpoints">Endpoints</a>
                </li>
                                    <ul id="tocify-subheader-endpoints" class="tocify-subheader">
                                                    <li class="tocify-item level-2" data-unique="endpoints-POSTapi-payment-ipn">
                                <a href="#endpoints-POSTapi-payment-ipn">POST api/payment/ipn</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-payment-verify">
                                <a href="#endpoints-POSTapi-payment-verify">POST api/payment/verify</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-payment-sync-pending">
                                <a href="#endpoints-POSTapi-payment-sync-pending">POST api/payment/sync-pending</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-rdv-ipn">
                                <a href="#endpoints-POSTapi-rdv-ipn">POST api/rdv/ipn</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-rdv-slots">
                                <a href="#endpoints-GETapi-rdv-slots">GET api/rdv/slots</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-rdv-booking--id-">
                                <a href="#endpoints-GETapi-rdv-booking--id-">GET api/rdv/booking/{id}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-login">
                                <a href="#endpoints-POSTapi-login">POST api/login</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-register">
                                <a href="#endpoints-POSTapi-register">POST api/register</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-forgot-password">
                                <a href="#endpoints-POSTapi-forgot-password">POST api/forgot-password</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-reset-password">
                                <a href="#endpoints-POSTapi-reset-password">POST api/reset-password</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-auth-google">
                                <a href="#endpoints-GETapi-auth-google">GET api/auth/google</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-auth-google-callback">
                                <a href="#endpoints-GETapi-auth-google-callback">GET api/auth/google/callback</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-products">
                                <a href="#endpoints-GETapi-products">GET api/products</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-products--id-">
                                <a href="#endpoints-GETapi-products--id-">GET api/products/{id}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-categories">
                                <a href="#endpoints-GETapi-categories">GET api/categories</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-beauty-services">
                                <a href="#endpoints-GETapi-beauty-services">GET api/beauty-services</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-promos-bar">
                                <a href="#endpoints-GETapi-promos-bar">GET api/promos/bar</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-promos-active">
                                <a href="#endpoints-GETapi-promos-active">GET api/promos/active</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-promos-validate">
                                <a href="#endpoints-POSTapi-promos-validate">POST api/promos/validate</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-payment-initiate">
                                <a href="#endpoints-POSTapi-payment-initiate">POST api/payment/initiate</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-payment-mobile-initiate">
                                <a href="#endpoints-POSTapi-payment-mobile-initiate">POST api/payment/mobile-initiate</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-logout">
                                <a href="#endpoints-POSTapi-logout">POST api/logout</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-user">
                                <a href="#endpoints-GETapi-user">GET api/user</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTapi-user-profile">
                                <a href="#endpoints-PUTapi-user-profile">PUT api/user/profile</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTapi-user-password">
                                <a href="#endpoints-PUTapi-user-password">PUT api/user/password</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-orders-my">
                                <a href="#endpoints-GETapi-orders-my">GET api/orders/my</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-rdv-my">
                                <a href="#endpoints-GETapi-rdv-my">GET api/rdv/my</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-rdv">
                                <a href="#endpoints-GETapi-rdv">GET api/rdv</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-rdv">
                                <a href="#endpoints-POSTapi-rdv">POST api/rdv</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PATCHapi-rdv--rdv_id--status">
                                <a href="#endpoints-PATCHapi-rdv--rdv_id--status">PATCH api/rdv/{rdv_id}/status</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-rdv-notifications">
                                <a href="#endpoints-GETapi-rdv-notifications">GET api/rdv/notifications</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-rdv-mark-notified">
                                <a href="#endpoints-POSTapi-rdv-mark-notified">POST api/rdv/mark-notified</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-beauty-services">
                                <a href="#endpoints-POSTapi-beauty-services">POST api/beauty-services</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTapi-beauty-services--beautyService_id-">
                                <a href="#endpoints-PUTapi-beauty-services--beautyService_id-">PUT api/beauty-services/{beautyService_id}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEapi-beauty-services--beautyService_id-">
                                <a href="#endpoints-DELETEapi-beauty-services--beautyService_id-">DELETE api/beauty-services/{beautyService_id}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-promos">
                                <a href="#endpoints-GETapi-promos">GET api/promos</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-promos">
                                <a href="#endpoints-POSTapi-promos">POST api/promos</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTapi-promos--promo_id-">
                                <a href="#endpoints-PUTapi-promos--promo_id-">PUT api/promos/{promo_id}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEapi-promos--promo_id-">
                                <a href="#endpoints-DELETEapi-promos--promo_id-">DELETE api/promos/{promo_id}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-promos-bar">
                                <a href="#endpoints-POSTapi-promos-bar">POST api/promos/bar</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-orders">
                                <a href="#endpoints-GETapi-orders">GET api/orders</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETapi-orders--order_id-">
                                <a href="#endpoints-GETapi-orders--order_id-">GET api/orders/{order_id}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PATCHapi-orders--order_id--status">
                                <a href="#endpoints-PATCHapi-orders--order_id--status">PATCH api/orders/{order_id}/status</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-orders-delivery">
                                <a href="#endpoints-POSTapi-orders-delivery">POST api/orders/delivery</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-products">
                                <a href="#endpoints-POSTapi-products">POST api/products</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTapi-products--product_id-">
                                <a href="#endpoints-PUTapi-products--product_id-">PUT api/products/{product_id}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEapi-products--product_id-">
                                <a href="#endpoints-DELETEapi-products--product_id-">DELETE api/products/{product_id}</a>
                            </li>
                                                                        </ul>
                            </ul>
            </div>

    <ul class="toc-footer" id="toc-footer">
                    <li style="padding-bottom: 5px;"><a href="{{ route("scribe.postman") }}">View Postman collection</a></li>
                            <li style="padding-bottom: 5px;"><a href="{{ route("scribe.openapi") }}">View OpenAPI spec</a></li>
                <li><a href="http://github.com/knuckleswtf/scribe">Documentation powered by Scribe ✍</a></li>
    </ul>

    <ul class="toc-footer" id="last-updated">
        <li>Last updated: June 29, 2026</li>
    </ul>
</div>

<div class="page-wrapper">
    <div class="dark-box"></div>
    <div class="content">
        <h1 id="introduction">Introduction</h1>
<p>Bienvenue sur la documentation officielle de l'API <strong>DAVGROUP</strong>. Cette API permet à l'application mobile et aux interfaces web de communiquer avec le backend.</p>
<aside>
    <strong>Base URL</strong>: <code>https://davholdinggroup.com/app</code>
</aside>
<p>Toutes les requêtes doivent inclure les headers suivants :</p>
<pre><code>Content-Type: application/json
Accept: application/json</code></pre>
<p>Les endpoints protégés nécessitent un token Bearer obtenu après connexion :</p>
<pre><code>Authorization: Bearer {token}</code></pre>
<aside>En faisant défiler la page, vous verrez des exemples de code pour différents langages dans la zone sombre à droite. Vous pouvez changer le langage avec les onglets en haut à droite.</aside>

        <h1 id="authentification">Authentification</h1>
<p>Cette API utilise <strong>Laravel Sanctum</strong> (Bearer Token).</p>
<p>Pour accéder aux endpoints protégés :</p>
<ol>
<li>Connectez-vous via <code>POST /api/login</code> ou <code>POST /api/register</code></li>
<li>Récupérez le <code>token</code> dans la réponse</li>
<li>Incluez-le dans toutes vos requêtes :</li>
</ol>
<pre><code>Authorization: Bearer {token}</code></pre>
<p>Les endpoints publics (produits, catégories, créneaux RDV, promos) ne nécessitent pas de token.</p>

        <h1 id="endpoints">Endpoints</h1>

    

                                <h2 id="endpoints-POSTapi-payment-ipn">POST api/payment/ipn</h2>

<p>
</p>



<span id="example-requests-POSTapi-payment-ipn">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/payment/ipn" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/payment/ipn"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-payment-ipn">
</span>
<span id="execution-results-POSTapi-payment-ipn" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-payment-ipn"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-payment-ipn"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-payment-ipn" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-payment-ipn">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-payment-ipn" data-method="POST"
      data-path="api/payment/ipn"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-payment-ipn', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-payment-ipn"
                    onclick="tryItOut('POSTapi-payment-ipn');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-payment-ipn"
                    onclick="cancelTryOut('POSTapi-payment-ipn');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-payment-ipn"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/payment/ipn</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-payment-ipn"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-payment-ipn"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTapi-payment-verify">POST api/payment/verify</h2>

<p>
</p>



<span id="example-requests-POSTapi-payment-verify">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/payment/verify" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"order_number\": \"architecto\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/payment/verify"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "order_number": "architecto"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-payment-verify">
</span>
<span id="execution-results-POSTapi-payment-verify" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-payment-verify"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-payment-verify"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-payment-verify" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-payment-verify">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-payment-verify" data-method="POST"
      data-path="api/payment/verify"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-payment-verify', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-payment-verify"
                    onclick="tryItOut('POSTapi-payment-verify');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-payment-verify"
                    onclick="cancelTryOut('POSTapi-payment-verify');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-payment-verify"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/payment/verify</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-payment-verify"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-payment-verify"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>order_number</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="order_number"                data-endpoint="POSTapi-payment-verify"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
        </form>

                    <h2 id="endpoints-POSTapi-payment-sync-pending">POST api/payment/sync-pending</h2>

<p>
</p>



<span id="example-requests-POSTapi-payment-sync-pending">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/payment/sync-pending" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/payment/sync-pending"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-payment-sync-pending">
</span>
<span id="execution-results-POSTapi-payment-sync-pending" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-payment-sync-pending"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-payment-sync-pending"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-payment-sync-pending" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-payment-sync-pending">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-payment-sync-pending" data-method="POST"
      data-path="api/payment/sync-pending"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-payment-sync-pending', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-payment-sync-pending"
                    onclick="tryItOut('POSTapi-payment-sync-pending');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-payment-sync-pending"
                    onclick="cancelTryOut('POSTapi-payment-sync-pending');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-payment-sync-pending"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/payment/sync-pending</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-payment-sync-pending"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-payment-sync-pending"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTapi-rdv-ipn">POST api/rdv/ipn</h2>

<p>
</p>



<span id="example-requests-POSTapi-rdv-ipn">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/rdv/ipn" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/rdv/ipn"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-rdv-ipn">
</span>
<span id="execution-results-POSTapi-rdv-ipn" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-rdv-ipn"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-rdv-ipn"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-rdv-ipn" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-rdv-ipn">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-rdv-ipn" data-method="POST"
      data-path="api/rdv/ipn"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-rdv-ipn', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-rdv-ipn"
                    onclick="tryItOut('POSTapi-rdv-ipn');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-rdv-ipn"
                    onclick="cancelTryOut('POSTapi-rdv-ipn');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-rdv-ipn"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/rdv/ipn</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-rdv-ipn"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-rdv-ipn"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETapi-rdv-slots">GET api/rdv/slots</h2>

<p>
</p>



<span id="example-requests-GETapi-rdv-slots">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/rdv/slots" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"date\": \"2026-06-29\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/rdv/slots"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "date": "2026-06-29"
};

fetch(url, {
    method: "GET",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-rdv-slots">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: [
        &quot;09:00&quot;,
        &quot;10:30&quot;,
        &quot;12:00&quot;,
        &quot;14:00&quot;,
        &quot;15:30&quot;,
        &quot;17:00&quot;
    ],
    &quot;booked&quot;: []
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-rdv-slots" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-rdv-slots"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-rdv-slots"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-rdv-slots" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-rdv-slots">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-rdv-slots" data-method="GET"
      data-path="api/rdv/slots"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-rdv-slots', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-rdv-slots"
                    onclick="tryItOut('GETapi-rdv-slots');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-rdv-slots"
                    onclick="cancelTryOut('GETapi-rdv-slots');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-rdv-slots"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/rdv/slots</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-rdv-slots"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-rdv-slots"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>date</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="date"                data-endpoint="GETapi-rdv-slots"
               value="2026-06-29"
               data-component="body">
    <br>
<p>Must be a valid date in the format <code>Y-m-d</code>. Example: <code>2026-06-29</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETapi-rdv-booking--id-">GET api/rdv/booking/{id}</h2>

<p>
</p>



<span id="example-requests-GETapi-rdv-booking--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/rdv/booking/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/rdv/booking/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-rdv-booking--id-">
            <blockquote>
            <p>Example response (500):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Server Error&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-rdv-booking--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-rdv-booking--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-rdv-booking--id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-rdv-booking--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-rdv-booking--id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-rdv-booking--id-" data-method="GET"
      data-path="api/rdv/booking/{id}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-rdv-booking--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-rdv-booking--id-"
                    onclick="tryItOut('GETapi-rdv-booking--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-rdv-booking--id-"
                    onclick="cancelTryOut('GETapi-rdv-booking--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-rdv-booking--id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/rdv/booking/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-rdv-booking--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-rdv-booking--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="id"                data-endpoint="GETapi-rdv-booking--id-"
               value="architecto"
               data-component="url">
    <br>
<p>The ID of the booking. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-POSTapi-login">POST api/login</h2>

<p>
</p>



<span id="example-requests-POSTapi-login">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/login" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"email\": \"gbailey@example.net\",
    \"password\": \"|]|{+-\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/login"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "email": "gbailey@example.net",
    "password": "|]|{+-"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-login">
</span>
<span id="execution-results-POSTapi-login" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-login"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-login"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-login" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-login">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-login" data-method="POST"
      data-path="api/login"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-login', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-login"
                    onclick="tryItOut('POSTapi-login');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-login"
                    onclick="cancelTryOut('POSTapi-login');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-login"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/login</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-login"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-login"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="POSTapi-login"
               value="gbailey@example.net"
               data-component="body">
    <br>
<p>Must be a valid email address. Example: <code>gbailey@example.net</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="POSTapi-login"
               value="|]|{+-"
               data-component="body">
    <br>
<p>Example: <code>|]|{+-</code></p>
        </div>
        </form>

                    <h2 id="endpoints-POSTapi-register">POST api/register</h2>

<p>
</p>



<span id="example-requests-POSTapi-register">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/register" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"name\": \"b\",
    \"email\": \"zbailey@example.net\",
    \"password\": \"-0pBNvYgxw\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/register"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "b",
    "email": "zbailey@example.net",
    "password": "-0pBNvYgxw"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-register">
</span>
<span id="execution-results-POSTapi-register" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-register"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-register"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-register" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-register">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-register" data-method="POST"
      data-path="api/register"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-register', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-register"
                    onclick="tryItOut('POSTapi-register');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-register"
                    onclick="cancelTryOut('POSTapi-register');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-register"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/register</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-register"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-register"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="POSTapi-register"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="POSTapi-register"
               value="zbailey@example.net"
               data-component="body">
    <br>
<p>Must be a valid email address. Example: <code>zbailey@example.net</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="POSTapi-register"
               value="-0pBNvYgxw"
               data-component="body">
    <br>
<p>Must be at least 8 characters. Example: <code>-0pBNvYgxw</code></p>
        </div>
        </form>

                    <h2 id="endpoints-POSTapi-forgot-password">POST api/forgot-password</h2>

<p>
</p>



<span id="example-requests-POSTapi-forgot-password">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/forgot-password" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"email\": \"gbailey@example.net\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/forgot-password"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "email": "gbailey@example.net"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-forgot-password">
</span>
<span id="execution-results-POSTapi-forgot-password" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-forgot-password"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-forgot-password"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-forgot-password" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-forgot-password">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-forgot-password" data-method="POST"
      data-path="api/forgot-password"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-forgot-password', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-forgot-password"
                    onclick="tryItOut('POSTapi-forgot-password');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-forgot-password"
                    onclick="cancelTryOut('POSTapi-forgot-password');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-forgot-password"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/forgot-password</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-forgot-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-forgot-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="POSTapi-forgot-password"
               value="gbailey@example.net"
               data-component="body">
    <br>
<p>Must be a valid email address. Example: <code>gbailey@example.net</code></p>
        </div>
        </form>

                    <h2 id="endpoints-POSTapi-reset-password">POST api/reset-password</h2>

<p>
</p>



<span id="example-requests-POSTapi-reset-password">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/reset-password" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"token\": \"architecto\",
    \"email\": \"zbailey@example.net\",
    \"password\": \"-0pBNvYgxw\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/reset-password"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "token": "architecto",
    "email": "zbailey@example.net",
    "password": "-0pBNvYgxw"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-reset-password">
</span>
<span id="execution-results-POSTapi-reset-password" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-reset-password"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-reset-password"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-reset-password" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-reset-password">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-reset-password" data-method="POST"
      data-path="api/reset-password"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-reset-password', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-reset-password"
                    onclick="tryItOut('POSTapi-reset-password');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-reset-password"
                    onclick="cancelTryOut('POSTapi-reset-password');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-reset-password"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/reset-password</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-reset-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-reset-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>token</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="token"                data-endpoint="POSTapi-reset-password"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="POSTapi-reset-password"
               value="zbailey@example.net"
               data-component="body">
    <br>
<p>Must be a valid email address. Example: <code>zbailey@example.net</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="POSTapi-reset-password"
               value="-0pBNvYgxw"
               data-component="body">
    <br>
<p>Must be at least 8 characters. Example: <code>-0pBNvYgxw</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETapi-auth-google">GET api/auth/google</h2>

<p>
</p>



<span id="example-requests-GETapi-auth-google">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/auth/google" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/auth/google"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-auth-google">
            <blockquote>
            <p>Example response (302):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
location: https://accounts.google.com/o/oauth2/auth?client_id=21244934932-e6jqq5gp4gpeisdrsl8s7e5pchbttkik.apps.googleusercontent.com&amp;redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fapi%2Fauth%2Fgoogle%2Fcallback&amp;scope=openid+profile+email&amp;response_type=code
content-type: text/html; charset=utf-8
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;UTF-8&quot; /&gt;
        &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0;url=&#039;https://accounts.google.com/o/oauth2/auth?client_id=21244934932-e6jqq5gp4gpeisdrsl8s7e5pchbttkik.apps.googleusercontent.com&amp;amp;redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fapi%2Fauth%2Fgoogle%2Fcallback&amp;amp;scope=openid+profile+email&amp;amp;response_type=code&#039;&quot; /&gt;

        &lt;title&gt;Redirecting to https://accounts.google.com/o/oauth2/auth?client_id=21244934932-e6jqq5gp4gpeisdrsl8s7e5pchbttkik.apps.googleusercontent.com&amp;amp;redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fapi%2Fauth%2Fgoogle%2Fcallback&amp;amp;scope=openid+profile+email&amp;amp;response_type=code&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        Redirecting to &lt;a href=&quot;https://accounts.google.com/o/oauth2/auth?client_id=21244934932-e6jqq5gp4gpeisdrsl8s7e5pchbttkik.apps.googleusercontent.com&amp;amp;redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fapi%2Fauth%2Fgoogle%2Fcallback&amp;amp;scope=openid+profile+email&amp;amp;response_type=code&quot;&gt;https://accounts.google.com/o/oauth2/auth?client_id=21244934932-e6jqq5gp4gpeisdrsl8s7e5pchbttkik.apps.googleusercontent.com&amp;amp;redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fapi%2Fauth%2Fgoogle%2Fcallback&amp;amp;scope=openid+profile+email&amp;amp;response_type=code&lt;/a&gt;.
    &lt;/body&gt;
&lt;/html&gt;</code>
 </pre>
    </span>
<span id="execution-results-GETapi-auth-google" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-auth-google"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-auth-google"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-auth-google" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-auth-google">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-auth-google" data-method="GET"
      data-path="api/auth/google"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-auth-google', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-auth-google"
                    onclick="tryItOut('GETapi-auth-google');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-auth-google"
                    onclick="cancelTryOut('GETapi-auth-google');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-auth-google"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/auth/google</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-auth-google"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-auth-google"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETapi-auth-google-callback">GET api/auth/google/callback</h2>

<p>
</p>



<span id="example-requests-GETapi-auth-google-callback">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/auth/google/callback" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/auth/google/callback"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-auth-google-callback">
            <blockquote>
            <p>Example response (302):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
location: http://localhost:5173/auth/callback?error=google_failed
content-type: text/html; charset=utf-8
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;UTF-8&quot; /&gt;
        &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0;url=&#039;http://localhost:5173/auth/callback?error=google_failed&#039;&quot; /&gt;

        &lt;title&gt;Redirecting to http://localhost:5173/auth/callback?error=google_failed&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        Redirecting to &lt;a href=&quot;http://localhost:5173/auth/callback?error=google_failed&quot;&gt;http://localhost:5173/auth/callback?error=google_failed&lt;/a&gt;.
    &lt;/body&gt;
&lt;/html&gt;</code>
 </pre>
    </span>
<span id="execution-results-GETapi-auth-google-callback" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-auth-google-callback"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-auth-google-callback"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-auth-google-callback" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-auth-google-callback">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-auth-google-callback" data-method="GET"
      data-path="api/auth/google/callback"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-auth-google-callback', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-auth-google-callback"
                    onclick="tryItOut('GETapi-auth-google-callback');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-auth-google-callback"
                    onclick="cancelTryOut('GETapi-auth-google-callback');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-auth-google-callback"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/auth/google/callback</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-auth-google-callback"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-auth-google-callback"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETapi-products">GET api/products</h2>

<p>
</p>



<span id="example-requests-GETapi-products">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/products" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/products"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-products">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: [
        {
            &quot;id&quot;: 9,
            &quot;category_id&quot;: 2,
            &quot;name&quot;: &quot;DAV&#039;ALOE VERA&quot;,
            &quot;slug&quot;: &quot;davaloe-vera-s4XXxd&quot;,
            &quot;description&quot;: &quot;DAV&#039;ALOE VERA vous donne  la fra&icirc;cheur et les bienfaits de l&#039;Aloe Vera con&ccedil;u pour prendre soin de votre peau au quotidien. Sa formule douce nettoie efficacement tout en apportant une hydratation durable. Gr&acirc;ce &agrave; ses propri&eacute;t&eacute;s apaisantes, l&#039;Aloe Vera aide &agrave; maintenir une peau douce, confortable et naturellement lumineuse.\r\n\r\nUne exp&eacute;rience de fra&icirc;cheur et de bien-&ecirc;tre &agrave; chaque douche.&quot;,
            &quot;price&quot;: 10000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 10,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;DAV-180&quot;,
            &quot;badge&quot;: null,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/EHzkIAEK7mKnbTStsoLdldpitxxIfj2OEYC90OgC.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/PjfpnZGXu7zofhP2V2Rej8IS3A1N4JwyRbzF57fz.jpg&quot;,
            &quot;category&quot;: &quot;Cosm&eacute;tiques&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 22,
            &quot;category_id&quot;: 1,
            &quot;name&quot;: &quot;DAV&#039;BLACK&quot;,
            &quot;slug&quot;: &quot;davblack-qftdsj&quot;,
            &quot;description&quot;: &quot;Cr&egrave;me Capillaire Croissance &amp; Nutrition \r\nPrenez soin de vos cheveux cr&eacute;pus avec notre cr&egrave;me capillaire sp&eacute;cialement formul&eacute;e pour stimuler la pousse et assouplir la fibre capillaire.\r\n Favorise une croissance saine des cheveux\r\nAssouplit et adoucit les cheveux cr&eacute;pus\r\n Nourrit intens&eacute;ment de la racine aux pointes\r\nR&eacute;duit la casse et les frisottis\r\n Facilite le coiffage et le d&eacute;m&ecirc;lage\r\n Apporte brillance, souplesse et vitalit&eacute;\r\n Gr&acirc;ce &agrave; sa formule riche et nourrissante, vos cheveux deviennent plus doux, plus forts et plus faciles &agrave; coiffer au quotidien.\r\nCr&egrave;me Capillaire Croissance : le soin id&eacute;al pour des cheveux cr&eacute;pus longs, souples et &eacute;clatants de sant&eacute;.&quot;,
            &quot;price&quot;: 10000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 20,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;DAV-154&quot;,
            &quot;badge&quot;: null,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/dWjRs8JrXfo8XGyMTIwroq4cLTRasAyKqFf63eZI.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/jQU5EAxiM4SFgJbieRJIAumxoJyPYLUaIFrpVSOb.png&quot;,
            &quot;category&quot;: &quot;Soins Capillaires&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 15,
            &quot;category_id&quot;: 2,
            &quot;name&quot;: &quot;DAV&#039;CACAO&quot;,
            &quot;slug&quot;: &quot;davcacao-em89pL&quot;,
            &quot;description&quot;: &quot;Donnez &agrave; votre peau le meilleur de la nature avec notre cr&egrave;me corporelle enrichie au cacao. V&eacute;ritable tr&eacute;sor de beaut&eacute;, le cacao est reconnu pour ses propri&eacute;t&eacute;s nourrissantes, r&eacute;paratrices et protectrices qui subliment la peau jour apr&egrave;s jour.\r\n Les bienfaits du cacao pour votre peau\r\n Hydratation intense\r\nGr&acirc;ce &agrave; sa richesse naturelle en beurre de cacao, notre cr&egrave;me nourrit profond&eacute;ment la peau et aide &agrave; maintenir son hydratation tout au long de la journ&eacute;e.\r\n Peau douce et soyeuse\r\nLe cacao aide &agrave; assouplir la peau, &agrave; r&eacute;duire la s&eacute;cheresse et &agrave; lui redonner une texture lisse et velout&eacute;e.\r\n Action antioxydante\r\nRiche en antioxydants, le cacao prot&egrave;ge la peau contre les agressions ext&eacute;rieures et contribue &agrave; lutter contre les signes pr&eacute;matur&eacute;s du vieillissement cutan&eacute;.\r\n&Eacute;clat naturel\r\nEn favorisant une peau bien nourrie et revitalis&eacute;e, notre cr&egrave;me r&eacute;v&egrave;le un teint plus lumineux et un &eacute;clat naturel irr&eacute;sistible.\r\n Confort et r&eacute;paration\r\nLe cacao aide &agrave; apaiser les peaux s&egrave;ches et fragilis&eacute;es tout en renfor&ccedil;ant la barri&egrave;re naturelle de la peau.\r\nPourquoi choisir notre cr&egrave;me au cacao ?\r\nNotre cr&egrave;me corporelle associe les vertus exceptionnelles du cacao &agrave; une formule soigneusement &eacute;labor&eacute;e pour offrir &agrave; votre peau douceur, nutrition et protection. Sa texture fondante p&eacute;n&egrave;tre rapidement sans laisser de film gras, laissant votre peau d&eacute;licatement parfum&eacute;e et incroyablement confortable.&quot;,
            &quot;price&quot;: 10000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 9,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;DAV-701&quot;,
            &quot;badge&quot;: null,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/M1GumXgHIzk4hehW6Ye9mkm6m5s89LENmfP4NcpJ.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/S5J1wv1Ynl4WVjT4e7rsIAxVQo21U6RKP7LijbOX.jpg&quot;,
            &quot;category&quot;: &quot;Cosm&eacute;tiques&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 7,
            &quot;category_id&quot;: 2,
            &quot;name&quot;: &quot;DAV&#039;CUCURMA&quot;,
            &quot;slug&quot;: &quot;davcucurma-Nuhe5U&quot;,
            &quot;description&quot;: &quot;Votre routine de soin sera un v&eacute;ritable moment de bien-&ecirc;tre. Gr&acirc;ce aux bienfaits du curcuma, ce gel douche nettoie, purifie et sublime la peau tout en respectant son &eacute;quilibre naturel. Sa formule douce aide &agrave; r&eacute;v&eacute;ler une peau &eacute;clatante, lumineuse et visiblement plus belle jour apr&egrave;s jour.\r\n\r\nUne peau propre, douce et rayonnante &agrave; chaque douche&quot;,
            &quot;price&quot;: 15000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 9,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;DAV-560&quot;,
            &quot;badge&quot;: null,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/yVsHJuMunEzjdmq9rLc1WG4TA0qQJM6bQ5M9T0tX.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/TKa0oUCHRy7GpGLC81wZsyeSkiSkE0c3JTSBbpa9.png&quot;,
            &quot;category&quot;: &quot;Cosm&eacute;tiques&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 3,
            &quot;category_id&quot;: 1,
            &quot;name&quot;: &quot;DAV&#039;HAIR&quot;,
            &quot;slug&quot;: &quot;davhair-LKns8D&quot;,
            &quot;description&quot;: &quot;Cr&egrave;me capillaire ultra-nourrissante pour tous types de cheveux.\r\nSa formule riche nourrit en profondeur, assouplit les cheveux cr&eacute;pus, sublime leur brillance naturelle et favorise un cuir chevelu sain. Les cheveux sont plus doux, souples et faciles &agrave; coiffer au quotidien.&quot;,
            &quot;price&quot;: 10000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 20,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;DAV-1&quot;,
            &quot;badge&quot;: &quot;badge-new&quot;,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/cmBpvMCjX8KIKnFuVjzPslsQw2BSvngedYObRDiA.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/5FVBiOBIJmXGBY1FGVBEa4Fzq1guUPxn7wCc3IaB.png&quot;,
            &quot;category&quot;: &quot;Soins Capillaires&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 13,
            &quot;category_id&quot;: 2,
            &quot;name&quot;: &quot;DAV&#039;POMMADE AVOCAT&quot;,
            &quot;slug&quot;: &quot;davpommade-avocat-zPZpbV&quot;,
            &quot;description&quot;: &quot;Enrichie en extrait d&#039;avocat, cette cr&egrave;me corps nourrit profond&eacute;ment la peau et lui apporte un confort durable. Naturellement riche en vitamines A, D et E ainsi qu&#039;en acides gras essentiels, l&#039;avocat est reconnu pour ses propri&eacute;t&eacute;s nourrissantes, adoucissantes et protectrices.&quot;,
            &quot;price&quot;: 5000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 9,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;DAV-456&quot;,
            &quot;badge&quot;: &quot;badge-best&quot;,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/PUJo1jJbS7JVlZyUnZ18CZUh9tsUDnAwAbaK374H.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/g1046M7MwXEy8Cp7sZxp9QJxODFzgxycO17M254O.png&quot;,
            &quot;category&quot;: &quot;Cosm&eacute;tiques&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 11,
            &quot;category_id&quot;: 2,
            &quot;name&quot;: &quot;DAV&#039;POMMADE CAROTTE&quot;,
            &quot;slug&quot;: &quot;davpommade-carotte-IlHsEU&quot;,
            &quot;description&quot;: &quot;Offrez &agrave; votre peau le meilleur de la nature gr&acirc;ce &agrave; notre cr&egrave;me &agrave; la carotte. Sa formule riche en vitamines aide &agrave; nourrir la peau en profondeur tout en sublimant son &eacute;clat naturel. Jour apr&egrave;s jour, la peau para&icirc;t plus douce, plus lumineuse et visiblement revitalis&eacute;e.\r\n\r\nLe soin id&eacute;al pour une peau &eacute;clatante de beaut&eacute; et pleine de vitalit&eacute;&quot;,
            &quot;price&quot;: 3000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 69,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;DAV-589&quot;,
            &quot;badge&quot;: null,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/nmFyzUMYnBDtEO7TsBRdcxmeMXSlPN0b8XhNmvKF.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/z8JK8xji7PdgQULSapqrmhKBuG4sRy25CdomCQIH.jpg&quot;,
            &quot;category&quot;: &quot;Cosm&eacute;tiques&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 12,
            &quot;category_id&quot;: 2,
            &quot;name&quot;: &quot;DAV&#039;POMMADE OEUF&quot;,
            &quot;slug&quot;: &quot;davpommade-oeuf-e3Feah&quot;,
            &quot;description&quot;: &quot;D&eacute;couvrez un soin riche et nourrissant  des bienfaits naturels de l&#039;&oelig;uf. Gr&acirc;ce &agrave; sa teneur en prot&eacute;ines, vitamines et nutriments essentiels, cette cr&egrave;me aide &agrave; revitaliser la peau, &agrave; pr&eacute;server sa souplesse et &agrave; lui offrir une hydratation optimale. Sa texture onctueuse p&eacute;n&egrave;tre facilement pour laisser la peau douce, satin&eacute;e et naturellement lumineuse.\r\n\r\nLe secret d&#039;une peau nourrie, souple et &eacute;clatante de beaut&eacute;.&quot;,
            &quot;price&quot;: 5000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 9,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;DAV-111&quot;,
            &quot;badge&quot;: null,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/sNapn21c2JbmnaT2uhaTvtTvJgZ47jaDlUrUEjIT.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/64kxpJu4fih8KVh2suvP0GyjDGk6gP9yUjWveGyu.jpg&quot;,
            &quot;category&quot;: &quot;Cosm&eacute;tiques&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 4,
            &quot;category_id&quot;: 2,
            &quot;name&quot;: &quot;DAV&#039;SOAP BRONZE&quot;,
            &quot;slug&quot;: &quot;davsoap-bronze-NATg0v&quot;,
            &quot;description&quot;: &quot;Les bienfaits du miel regroup&eacute; dans un savon . Sa formule riche et nourrissante nettoie, hydrate et clarifie la peau tout en pr&eacute;servant son &eacute;quilibre naturel. Gr&acirc;ce &agrave; ses propri&eacute;t&eacute;s r&eacute;paratrices et antioxydantes, le miel contribue &agrave; r&eacute;v&eacute;ler un teint lumineux, une peau douce et visiblement plus saine jour apr&egrave;s jour.&quot;,
            &quot;price&quot;: 10000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 20,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;DSO-256&quot;,
            &quot;badge&quot;: null,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/TuGilLQUi9ktEwo4YDZuqaeh4aJuUK9kcDNqT56g.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/mRUwtojrikkSSxEvX3et5PW6yqU9h1X0ctvIe2Sf.jpg&quot;,
            &quot;category&quot;: &quot;Cosm&eacute;tiques&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 5,
            &quot;category_id&quot;: 2,
            &quot;name&quot;: &quot;DAV&#039;SOAP CARAMEL&quot;,
            &quot;slug&quot;: &quot;davsoap-caramel-3i6vgb&quot;,
            &quot;description&quot;: &quot;Formul&eacute; &agrave; base de citron, ce savon nettoie la peau en douceur tout en r&eacute;v&eacute;lant son &eacute;clat naturel. Il aide &agrave; illuminer le teint, &agrave; unifier la peau et &agrave; lui apporter un effet glow lumineux. Id&eacute;al pour sublimer les peaux au teint caramel et leur offrir une apparence fra&icirc;che, douce et rayonnante.&quot;,
            &quot;price&quot;: 5000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 60,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;DAV-123&quot;,
            &quot;badge&quot;: null,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/o6R33vYYW1dJbhan0C6ory6WrG6NOoZQWmwou14f.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/8OriSmEk9QzZWmotzKvqr9RIXtyaqjdWKptyeH43.jpg&quot;,
            &quot;category&quot;: &quot;Cosm&eacute;tiques&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 6,
            &quot;category_id&quot;: 2,
            &quot;name&quot;: &quot;DAV&#039;SOAP CAROTTE&quot;,
            &quot;slug&quot;: &quot;davsoap-carotte-ovJJDb&quot;,
            &quot;description&quot;: &quot;Votre peau m&eacute;rite les bienfaits de la carotte ! Sa formule enrichie en vitamines aide &agrave; illuminer le teint, &agrave; nourrir la peau et &agrave; lui redonner tout son &eacute;clat naturel. Jour apr&egrave;s jour, votre peau para&icirc;t plus douce, plus lumineuse et visiblement rayonnante.&quot;,
            &quot;price&quot;: 5000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 20,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;DAV-250&quot;,
            &quot;badge&quot;: null,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/3ew2rD3uqlT7ySmlUhBYY8EXSk2we565HU7hVGro.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/qZWvxAFS6Fi1xm51XRHLwtH6mBkgNaI5Y5S8msjv.jpg&quot;,
            &quot;category&quot;: &quot;Cosm&eacute;tiques&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 8,
            &quot;category_id&quot;: 2,
            &quot;name&quot;: &quot;DAV&#039;WHITE&quot;,
            &quot;slug&quot;: &quot;davwhite-stL3WB&quot;,
            &quot;description&quot;: &quot;DAV&#039;WHITE apporte &agrave; votre peau un soin nourrissant avec les bienfaits naturels de l&#039;&oelig;uf. Sa formule riche en prot&eacute;ines et en vitamines nettoie d&eacute;licatement tout en aidant &agrave; pr&eacute;server la douceur et l&#039;&eacute;lasticit&eacute; de la peau. Apr&egrave;s chaque utilisation, la peau para&icirc;t plus souple, plus lisse et naturellement &eacute;clatante.\r\n\r\nLe secret d&#039;une peau nourrie, douce et rayonnante au quotidien.&quot;,
            &quot;price&quot;: 5000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 10,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;DAV-122&quot;,
            &quot;badge&quot;: null,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/pQaU0fjwxq7PH1K9vzfmrgwK4wEYGLN45cJjrxdv.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/uGWtH9bqlpoZyiqFrHRAt5vykKMOF0OiFE0KnoP8.jpg&quot;,
            &quot;category&quot;: &quot;Cosm&eacute;tiques&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 24,
            &quot;category_id&quot;: 1,
            &quot;name&quot;: &quot;DUO ALOE VERA&quot;,
            &quot;slug&quot;: &quot;duo-aloe-vera-0m3xlx&quot;,
            &quot;description&quot;: &quot;D&eacute;couvrez notre Duo Shampooing &amp; D&eacute;m&ecirc;lant &agrave; l&#039;Aloe Vera, le soin id&eacute;al pour des cheveux hydrat&eacute;s, doux et pleins de vitalit&eacute;.\r\n Hydrate intens&eacute;ment les cheveux et le cuir chevelu\r\n Apaise les irritations et les d&eacute;mangeaisons\r\n Facilite le d&eacute;m&ecirc;lage et r&eacute;duit la casse\r\n Renforce la fibre capillaire\r\n Redonne douceur, souplesse et brillance aux cheveux\r\n Favorise une chevelure saine et &eacute;clatante\r\nL&#039;aloe vera est reconnu pour ses propri&eacute;t&eacute;s hydratantes, r&eacute;paratrices et apaisantes. Il aide &agrave; maintenir l&#039;&eacute;quilibre du cuir chevelu tout en laissant les cheveux doux, l&eacute;gers et faciles &agrave; coiffer.\r\nDuo Shampooing &amp; D&eacute;m&ecirc;lant &agrave; l&#039;Aloe Vera : le secret de cheveux nourris, brillants et naturellement beaux.&quot;,
            &quot;price&quot;: 10000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 20,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;DAV-140&quot;,
            &quot;badge&quot;: null,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/K8BVh9KCqrkTajrodeLWF8jgQnxtYwc4sC9jCg9W.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/PMhu4rF2SEItjwnSDLr8gL4gHJ0wNFFi6yo27QFJ.png&quot;,
            &quot;category&quot;: &quot;Soins Capillaires&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 20,
            &quot;category_id&quot;: 1,
            &quot;name&quot;: &quot;DUO BLACK PLUS&quot;,
            &quot;slug&quot;: &quot;duo-black-plus-pAVCSL&quot;,
            &quot;description&quot;: &quot;Huile Capillaire Croissance au Ricin &amp; Beurre de Karit&eacute;\r\nStimule la pousse de vos cheveux naturellement gr&acirc;ce &agrave; notre huile capillaire enrichie en huile de ricin et beurre de karit&eacute;.\r\n Favorise la croissance des cheveux\r\n Fortifie les racines et r&eacute;duit la casse\r\n Nourrit intens&eacute;ment le cuir chevelu\r\n Hydrate et prot&egrave;ge les longueurs\r\nApporte douceur, brillance et souplesse aux cheveux\r\nL&#039;huile de ricin est reconnue pour stimuler la pousse et renforcer les cheveux, tandis que le beurre de karit&eacute; nourrit profond&eacute;ment et aide &agrave; pr&eacute;venir la s&eacute;cheresse capillaire.\r\nDes cheveux plus forts, plus longs et visiblement plus sains jour apr&egrave;s jour.\r\nHuile Capillaire Ricin &amp; Karit&eacute; : le soin naturel pour r&eacute;v&eacute;ler toute la beaut&eacute; de vos cheveux.&quot;,
            &quot;price&quot;: 15000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 10,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;DUO-014&quot;,
            &quot;badge&quot;: null,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/p4HjiU4GLkSw3FIBhUrUKrb55MZqUkHRMZ6JUNXa.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/ymwcYDkj8tz6NR31AGATACkhlW4gX8ufvPdW8zi0.png&quot;,
            &quot;category&quot;: &quot;Soins Capillaires&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 23,
            &quot;category_id&quot;: 1,
            &quot;name&quot;: &quot;DUO GIMGEMBRE&quot;,
            &quot;slug&quot;: &quot;duo-gimgembre-gTQrFK&quot;,
            &quot;description&quot;: &quot;Duo Shampooing &amp; D&eacute;m&ecirc;lant au Gingembre \r\nOffrez &agrave; vos cheveux un soin complet gr&acirc;ce &agrave; notre Duo Shampooing &amp; D&eacute;m&ecirc;lant au Gingembre, con&ccedil;u pour nettoyer, fortifier et embellir votre chevelure.\r\nAide &agrave; r&eacute;duire les pellicules et &agrave; assainir le cuir chevelu\r\nStimule la croissance des cheveux\r\nNettoie en douceur sans agresser le cuir chevelu\r\nFacilite le d&eacute;m&ecirc;lage et limite la casse\r\n Renforce et revitalise les cheveux\r\n Apporte douceur, brillance et fra&icirc;cheur\r\n Reconnu pour ses propri&eacute;t&eacute;s purifiantes et stimulantes, le gingembre aide &agrave; maintenir un cuir chevelu sain tout en favorisant des cheveux plus forts et plus vigoureux.\r\nDuo Shampooing &amp; D&eacute;m&ecirc;lant au Gingembre : la solution id&eacute;ale pour des cheveux propres, forts, sans pellicules et faciles &agrave; coiffer.&quot;,
            &quot;price&quot;: 15000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 29,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;DAV-001&quot;,
            &quot;badge&quot;: &quot;badge-best&quot;,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/kWkzT21lZlCAQLmGzQFvCjDpZo6V6S03EQRtdMRh.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/iExl8qPbuvWKYNe3Lhpwrh582uABPeKLbeMMQLzZ.png&quot;,
            &quot;category&quot;: &quot;Soins Capillaires&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 19,
            &quot;category_id&quot;: 1,
            &quot;name&quot;: &quot;DUO POUSS PLUS&quot;,
            &quot;slug&quot;: &quot;duo-pouss-plus-osQxld&quot;,
            &quot;description&quot;: &quot;Huile Capillaire Croissance au Ricin &amp; Beurre de Karit&eacute;\r\nStimule la pousse de vos cheveux naturellement gr&acirc;ce &agrave; notre huile capillaire enrichie en huile de ricin et beurre de karit&eacute;.\r\n Favorise la croissance des cheveux\r\n Fortifie les racines et r&eacute;duit la casse\r\n Nourrit intens&eacute;ment le cuir chevelu\r\n Hydrate et prot&egrave;ge les longueurs\r\nApporte douceur, brillance et souplesse aux cheveux\r\nL&#039;huile de ricin est reconnue pour stimuler la pousse et renforcer les cheveux, tandis que le beurre de karit&eacute; nourrit profond&eacute;ment et aide &agrave; pr&eacute;venir la s&eacute;cheresse capillaire.\r\nDes cheveux plus forts, plus longs et visiblement plus sains jour apr&egrave;s jour.\r\nHuile et pommade de cheveux fait de  Ricin &amp; Karit&eacute; : le soin naturel pour donner toute la beaut&eacute; &agrave; vos cheveux.&quot;,
            &quot;price&quot;: 20000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 10,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;DAV-85&quot;,
            &quot;badge&quot;: &quot;badge-best&quot;,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/8zw99HE6nXyktGhcTEHIRnzxSjjnsKKEP83ToQSu.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/QOApYRXrKQuA3lgJvOpVm4ll8ByA5qNIp0iyUDpn.png&quot;,
            &quot;category&quot;: &quot;Soins Capillaires&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 21,
            &quot;category_id&quot;: 1,
            &quot;name&quot;: &quot;HUILE BLACK PLUS&quot;,
            &quot;slug&quot;: &quot;huile-black-plus-hTYoWO&quot;,
            &quot;description&quot;: &quot;Huile Capillaire Croissance au Ricin &amp; Beurre de Karit&eacute;\r\nStimule la pousse de vos cheveux naturellement gr&acirc;ce &agrave; notre huile capillaire enrichie en huile de ricin et beurre de karit&eacute;.\r\n Favorise la croissance des cheveux\r\n Fortifie les racines et r&eacute;duit la casse\r\n Nourrit intens&eacute;ment le cuir chevelu\r\n Hydrate et prot&egrave;ge les longueurs\r\nApporte douceur, brillance et souplesse aux cheveux\r\nL&#039;huile de ricin est reconnue pour stimuler la pousse et renforcer les cheveux, tandis que le beurre de karit&eacute; nourrit profond&eacute;ment et aide &agrave; pr&eacute;venir la s&eacute;cheresse capillaire.\r\nDes cheveux plus forts, plus longs et visiblement plus sains jour apr&egrave;s jour.\r\nHuile Capillaire Ricin &amp; Karit&eacute; : le soin naturel pour r&eacute;v&eacute;ler toute la beaut&eacute; de vos cheveux.&quot;,
            &quot;price&quot;: 10000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 9,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;HUI-10&quot;,
            &quot;badge&quot;: null,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/CTDINt5CxQYoOVaZjKAU20os6tajHsM6UO7LS23A.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/QGA09RaIJmCb47IwSyk0p8DJiWYveQ6mclbq7V0Y.png&quot;,
            &quot;category&quot;: &quot;Soins Capillaires&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 14,
            &quot;category_id&quot;: 2,
            &quot;name&quot;: &quot;Huile Miracle&quot;,
            &quot;slug&quot;: &quot;huile-miracle-f8uIU3&quot;,
            &quot;description&quot;: &quot;Huile Miracle Dav Beaut&eacute; &ndash; Cacao &amp; Beurre de Karit&eacute;\r\n\r\nOffrez &agrave; votre peau un soin d&#039;exception inspir&eacute; des tr&eacute;sors de la nature. Enrichie en cacao et en beurre de karit&eacute;, notre Huile Miracle nourrit profond&eacute;ment la peau et aide &agrave; restaurer sa douceur naturelle. Le cacao, riche en antioxydants, contribue &agrave; pr&eacute;server l&#039;&eacute;clat de la peau, tandis que le beurre de karit&eacute; apporte une hydratation intense et durable.\r\n\r\nSa texture l&eacute;g&egrave;re et soyeuse enveloppe votre peau d&#039;un voile de douceur pour un fini lumineux et &eacute;clatant.\r\n\r\nLe secret d&#039;une peau nourrie, rayonnante et sublim&eacute;e au quotidien.&quot;,
            &quot;price&quot;: 15000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 30,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;HUM-126&quot;,
            &quot;badge&quot;: &quot;badge-new&quot;,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/PPthfJP0IYJ6eQLsq1nYwXA7a1otMG9PPhA9dYJV.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/oWZ9sncH7eXhCLjNnYoZDgx8dTkRfNDeKsIxClCg.png&quot;,
            &quot;category&quot;: &quot;Cosm&eacute;tiques&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 17,
            &quot;category_id&quot;: 2,
            &quot;name&quot;: &quot;KIT VISAGE BANANA&quot;,
            &quot;slug&quot;: &quot;kit-visage-tcGG38&quot;,
            &quot;description&quot;: &quot;Offrez &agrave; votre peau toute la richesse de la banane gr&acirc;ce &agrave; notre Kit Visage compos&eacute; d&#039;un savon, d&#039;une lotion et d&#039;une cr&egrave;me visage.\r\nHydrate intens&eacute;ment et nourrit la peau\r\n Apporte &eacute;clat et douceur au teint\r\n Aide &agrave; lutter contre les signes de fatigue\r\nFavorise une peau souple et lumineuse\r\nProt&egrave;ge la peau gr&acirc;ce &agrave; sa richesse en vitamines et antioxydants\r\nLa banane est un v&eacute;ritable tr&eacute;sor de beaut&eacute; qui aide &agrave; r&eacute;v&eacute;ler une peau fra&icirc;che, douce et rayonnante au quotidien.\r\nKit Visage &agrave; la Banane : pour une peau nourrie, &eacute;clatante et pleine de vitalit&eacute; !&quot;,
            &quot;price&quot;: 10000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 10,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;KIT-95&quot;,
            &quot;badge&quot;: null,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/fkEsKgoDsAXfIs7aAkWtCJvE1uBE6u4GrmxsPLB9.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/UJNL01M1a6i1zGuu04YoRszu49DaoKHtLd45uRAn.png&quot;,
            &quot;category&quot;: &quot;Cosm&eacute;tiques&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 18,
            &quot;category_id&quot;: 2,
            &quot;name&quot;: &quot;KIT VISAGE CACAO&quot;,
            &quot;slug&quot;: &quot;kit-visage-cacao-csc0RF&quot;,
            &quot;description&quot;: &quot;D&eacute;couvrez notre Kit Visage au Cacao compos&eacute; d&#039;un savon, d&#039;une lotion et d&#039;une cr&egrave;me visage pour une peau &eacute;clatante de beaut&eacute;.\r\n Nourrit intens&eacute;ment la peau\r\n Hydrate et adoucit durablement\r\n Prot&egrave;ge gr&acirc;ce &agrave; sa richesse en antioxydants\r\nAide &agrave; pr&eacute;server l&#039;&eacute;lasticit&eacute; de la peau\r\nRedonne &eacute;clat et vitalit&eacute; au teint\r\nLe cacao est un tr&eacute;sor naturel qui aide &agrave; maintenir une peau douce, lumineuse et visiblement plus belle jour apr&egrave;s jour. \r\nKit Visage au Cacao : le soin gourmand pour une peau nourrie, &eacute;clatante et rayonnante !&quot;,
            &quot;price&quot;: 10000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 10,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;KIT-08&quot;,
            &quot;badge&quot;: &quot;badge-new&quot;,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/uLlVcNGByH6kt8V5YOpHcDschSp5j2lkRTP4yRFu.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/87ww6J8keGffqxaZouuRc9CBVZw0t035nTjSbn2T.png&quot;,
            &quot;category&quot;: &quot;Cosm&eacute;tiques&quot;,
            &quot;is_active&quot;: true
        },
        {
            &quot;id&quot;: 16,
            &quot;category_id&quot;: 2,
            &quot;name&quot;: &quot;KIT VISAGE RICE&quot;,
            &quot;slug&quot;: &quot;kit-visage-rice-vQb9Bq&quot;,
            &quot;description&quot;: &quot;L&#039;&eacute;clat naturel de votre peau de notre Kit Visage au Riz compos&eacute; d&#039;un savon, d&#039;une lotion et d&#039;une cr&egrave;me visage.\r\n &Eacute;claircit et unifie le teint\r\n Hydrate et nourrit la peau en profondeur\r\nR&eacute;duit l&#039;apparence des taches et imperfections\r\nAffine le grain de peau\r\nApporte douceur, fra&icirc;cheur et &eacute;clat naturel\r\nLe pouvoir du riz au service de votre beaut&eacute; pour une peau lumineuse, douce et rayonnante au quotidien.\r\nKit Visage au Riz : votre secret pour un teint frais, uniforme et &eacute;clatant !&quot;,
            &quot;price&quot;: 10000,
            &quot;cost&quot;: null,
            &quot;quantity&quot;: 10,
            &quot;min_quantity&quot;: 10,
            &quot;sku&quot;: &quot;VDR-555&quot;,
            &quot;badge&quot;: null,
            &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/1e8ba8CdGojGslCSgYCvTcKjsMLEhJ5D85Am3nnV.png&quot;,
            &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/ewVbqPhH8950zXNgujSpcbnf8EFJKGC05ktiVKiH.jpg&quot;,
            &quot;category&quot;: &quot;Cosm&eacute;tiques&quot;,
            &quot;is_active&quot;: true
        }
    ]
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-products" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-products"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-products"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-products" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-products">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-products" data-method="GET"
      data-path="api/products"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-products', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-products"
                    onclick="tryItOut('GETapi-products');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-products"
                    onclick="cancelTryOut('GETapi-products');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-products"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/products</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-products"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-products"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETapi-products--id-">GET api/products/{id}</h2>

<p>
</p>



<span id="example-requests-GETapi-products--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/products/3" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/products/3"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-products--id-">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: {
        &quot;id&quot;: 3,
        &quot;category_id&quot;: 1,
        &quot;name&quot;: &quot;DAV&#039;HAIR&quot;,
        &quot;slug&quot;: &quot;davhair-LKns8D&quot;,
        &quot;description&quot;: &quot;Cr&egrave;me capillaire ultra-nourrissante pour tous types de cheveux.\r\nSa formule riche nourrit en profondeur, assouplit les cheveux cr&eacute;pus, sublime leur brillance naturelle et favorise un cuir chevelu sain. Les cheveux sont plus doux, souples et faciles &agrave; coiffer au quotidien.&quot;,
        &quot;price&quot;: 10000,
        &quot;cost&quot;: null,
        &quot;quantity&quot;: 20,
        &quot;min_quantity&quot;: 10,
        &quot;sku&quot;: &quot;DAV-1&quot;,
        &quot;badge&quot;: &quot;badge-new&quot;,
        &quot;image&quot;: &quot;http://127.0.0.1:8000/storage/products/cmBpvMCjX8KIKnFuVjzPslsQw2BSvngedYObRDiA.png&quot;,
        &quot;image2&quot;: &quot;http://127.0.0.1:8000/storage/products/5FVBiOBIJmXGBY1FGVBEa4Fzq1guUPxn7wCc3IaB.png&quot;,
        &quot;category&quot;: &quot;Soins Capillaires&quot;,
        &quot;is_active&quot;: true
    }
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-products--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-products--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-products--id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-products--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-products--id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-products--id-" data-method="GET"
      data-path="api/products/{id}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-products--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-products--id-"
                    onclick="tryItOut('GETapi-products--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-products--id-"
                    onclick="cancelTryOut('GETapi-products--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-products--id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/products/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-products--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-products--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="id"                data-endpoint="GETapi-products--id-"
               value="3"
               data-component="url">
    <br>
<p>The ID of the product. Example: <code>3</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETapi-categories">GET api/categories</h2>

<p>
</p>



<span id="example-requests-GETapi-categories">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/categories" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/categories"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-categories">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: [
        {
            &quot;id&quot;: 4,
            &quot;name&quot;: &quot;Accessoires&quot;,
            &quot;slug&quot;: &quot;accessoires&quot;,
            &quot;description&quot;: &quot;Accessoires de coiffure et beaut&eacute;&quot;,
            &quot;image&quot;: null
        },
        {
            &quot;id&quot;: 5,
            &quot;name&quot;: &quot;Coiffage&quot;,
            &quot;slug&quot;: &quot;coiffage&quot;,
            &quot;description&quot;: &quot;Produits de coiffage et styling&quot;,
            &quot;image&quot;: null
        },
        {
            &quot;id&quot;: 2,
            &quot;name&quot;: &quot;Cosm&eacute;tiques&quot;,
            &quot;slug&quot;: &quot;cosmetiques&quot;,
            &quot;description&quot;: &quot;Produits de beaut&eacute; et cosm&eacute;tiques&quot;,
            &quot;image&quot;: null
        },
        {
            &quot;id&quot;: 1,
            &quot;name&quot;: &quot;Soins Capillaires&quot;,
            &quot;slug&quot;: &quot;soins-capillaires&quot;,
            &quot;description&quot;: &quot;Produits pour l&#039;entretien et le soin des cheveux&quot;,
            &quot;image&quot;: null
        },
        {
            &quot;id&quot;: 3,
            &quot;name&quot;: &quot;Soins SPA&quot;,
            &quot;slug&quot;: &quot;soins-spa&quot;,
            &quot;description&quot;: &quot;Produits de spa et relaxation&quot;,
            &quot;image&quot;: null
        }
    ]
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-categories" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-categories"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-categories"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-categories" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-categories">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-categories" data-method="GET"
      data-path="api/categories"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-categories', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-categories"
                    onclick="tryItOut('GETapi-categories');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-categories"
                    onclick="cancelTryOut('GETapi-categories');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-categories"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/categories</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-categories"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-categories"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETapi-beauty-services">GET api/beauty-services</h2>

<p>
</p>



<span id="example-requests-GETapi-beauty-services">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/beauty-services" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/beauty-services"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-beauty-services">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: [
        {
            &quot;id&quot;: 74,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;soins&quot;,
            &quot;title&quot;: &quot;Capillaire&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: null,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/7RbKodBEjKelL8ilHZRF5LXqdmt7FoIXbDiAu5o2.png&quot;
        },
        {
            &quot;id&quot;: 38,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;soins&quot;,
            &quot;title&quot;: &quot;Casque thermique&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;15000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/PfyUAZf2J2RLpMKv3HuhnusG1Tfut8eVOsc1aE4B.png&quot;
        },
        {
            &quot;id&quot;: 46,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;natte&quot;,
            &quot;title&quot;: &quot;chapeau&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: null,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/INr5fmEEvsmzq2vrciVEeNfJCpFEofWAc7MLPQnf.png&quot;
        },
        {
            &quot;id&quot;: 45,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;natte&quot;,
            &quot;title&quot;: &quot;chion&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: null,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/ehwKXB6cNq2Tu7vy81gXLELYy2XcMJrdewLUVeRK.png&quot;
        },
        {
            &quot;id&quot;: 35,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;soins&quot;,
            &quot;title&quot;: &quot;Entretien capillaire&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/kjo792vcKhvctFEFkliAwROnBoGZbkPjOO0z21Or.jpg&quot;
        },
        {
            &quot;id&quot;: 36,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;soins&quot;,
            &quot;title&quot;: &quot;Lissage br&eacute;silien&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;15000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/h0u391aPtppAoUSJlqM1eAu3MwSWDz7pgZaB1O2k.jpg&quot;
        },
        {
            &quot;id&quot;: 13,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Locs&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;35000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/pT3G1dg0aqX1hvXYXlvYuhLumsZn5XiywUCsjDjH.jpg&quot;
        },
        {
            &quot;id&quot;: 55,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;natte&quot;,
            &quot;title&quot;: &quot;Mamouchka&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/JquipURWrpcBoG70B6XJ0GD4okoEYzW86lOc7UMS.png&quot;
        },
        {
            &quot;id&quot;: 59,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;natte&quot;,
            &quot;title&quot;: &quot;Mamouchka&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/N90jofyNCeisTzeIeyfmHYoABRv0dfVjAKvtuRUn.jpg&quot;
        },
        {
            &quot;id&quot;: 75,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;spa&quot;,
            &quot;title&quot;: &quot;Masque agile&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: null,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/klwypNXPcOIc2OP0V1Lqvka5XNxbJ4l4YHivpUlA.png&quot;
        },
        {
            &quot;id&quot;: 37,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;soins&quot;,
            &quot;title&quot;: &quot;Massage capillaire&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/TIqBOVkTNGzbMStUdA7lGCyBRJrBQgVGP2lKKaft.png&quot;
        },
        {
            &quot;id&quot;: 40,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;micro&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;45000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/rmSBTn152Z0Xe1CvX8V5y5wPOzesOhBnYe9BmW5h.png&quot;
        },
        {
            &quot;id&quot;: 54,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;micro twist&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;30000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/h1XCTtkoqNb60hO3712R9u49bd7It0QxvpzAXrRx.jpg&quot;
        },
        {
            &quot;id&quot;: 15,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Micro twist long&quot;,
            &quot;subtitle&quot;: &quot;micro twist&quot;,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;35000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/z9N4JwDoMxzw6ybcqd6Mnnfpa8dXNPPnvyIT68cT.png&quot;
        },
        {
            &quot;id&quot;: 16,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Micro-twist&quot;,
            &quot;subtitle&quot;: &quot;Micro twist long 2&quot;,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;45000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/WTDJF23A1Jz93dfbGzoLI9eIw5vAohkglLoHktfV.png&quot;
        },
        {
            &quot;id&quot;: 60,
            &quot;section_key&quot;: &quot;ongerie&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Nail&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;15000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/IQingTN31jGxQHQSqzvCPgIuy3kSqixA2ZHFlrln.webp&quot;
        },
        {
            &quot;id&quot;: 33,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;ongerie&quot;,
            &quot;title&quot;: &quot;Nail&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: null,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/XhGnJ1no44C9RAf0GsLcsRQIzlwSoJ8x81Qriimu.jpg&quot;
        },
        {
            &quot;id&quot;: 34,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;ongerie&quot;,
            &quot;title&quot;: &quot;Nail&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: null,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/C0N7RK1NZ6Siy5MKmH8cJ01RWLxuzxOBjiBb64Ce.jpg&quot;
        },
        {
            &quot;id&quot;: 69,
            &quot;section_key&quot;: &quot;ongerie&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Nail&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/eE39F8AZMz24OSE9ROY7o32qjZghFOYDKbaH6kIA.jpg&quot;
        },
        {
            &quot;id&quot;: 63,
            &quot;section_key&quot;: &quot;ongerie&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Nail&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/xMN7kMJ7PmLxe3BhE3NCsT9uU78vBe0SgTkleide.jpg&quot;
        },
        {
            &quot;id&quot;: 64,
            &quot;section_key&quot;: &quot;ongerie&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Nail&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/6DLjwgXTpi59iyhIThbmyHWrkLoLYi72cZzHOqRZ.jpg&quot;
        },
        {
            &quot;id&quot;: 65,
            &quot;section_key&quot;: &quot;ongerie&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Nail&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/WiEx09N1xBdYqfXZ4u5hXAWFgi2sEo7dVefbRAsH.webp&quot;
        },
        {
            &quot;id&quot;: 66,
            &quot;section_key&quot;: &quot;ongerie&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Nail&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/20b5IiICczRVPnSxUl6lEa5BxwQkU1GWpxtOLHWj.webp&quot;
        },
        {
            &quot;id&quot;: 67,
            &quot;section_key&quot;: &quot;ongerie&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Nail&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/FLCPmYBZn8Qvvk79r4EtCcv1Z45ml41PYN7Xhnm3.jpg&quot;
        },
        {
            &quot;id&quot;: 68,
            &quot;section_key&quot;: &quot;ongerie&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Nail&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/PRZevV1uignhsAfzOygsiPXVD58PydHAXSw5eTyC.jpg&quot;
        },
        {
            &quot;id&quot;: 70,
            &quot;section_key&quot;: &quot;ongerie&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Nail&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/aHDVmpgyERrdY7pD2lFXRvrmBK5ZXEIAV7Wkuabq.jpg&quot;
        },
        {
            &quot;id&quot;: 71,
            &quot;section_key&quot;: &quot;ongerie&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Nail&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/0NRZY6Z7nG2Y8ljPG68JkPhwdRVRrsFNlcNsB0VM.jpg&quot;
        },
        {
            &quot;id&quot;: 72,
            &quot;section_key&quot;: &quot;ongerie&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Nail&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/PigikoD4zM2fjvEOPLRoLvqW3SxhxCXoKykXjrtD.jpg&quot;
        },
        {
            &quot;id&quot;: 73,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;ongerie&quot;,
            &quot;title&quot;: &quot;Nail&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: null,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/pampjBKax7p8O1fiG8hDRu2shRvH4w2Cq2k8mpJu.webp&quot;
        },
        {
            &quot;id&quot;: 61,
            &quot;section_key&quot;: &quot;ongerie&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Nail&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;15000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/pXSKfpmCNnYTOt7r96DrEVD9qjS7pP2Qdo840Hh5.jpg&quot;
        },
        {
            &quot;id&quot;: 32,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;ongerie&quot;,
            &quot;title&quot;: &quot;Nail  chocolat&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: null,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/UmV3MilMPX4QpGj3QCJzTUoFQvjAtI1ybr7kEmS2.jpg&quot;
        },
        {
            &quot;id&quot;: 31,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;ongerie&quot;,
            &quot;title&quot;: &quot;Nail pink&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: null,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/nzOQzx9ufjhxPWgd41wrsJQhNjzs3aDJGEkXtOZf.jpg&quot;
        },
        {
            &quot;id&quot;: 30,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;ongerie&quot;,
            &quot;title&quot;: &quot;Nail white&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: null,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/EGn48bU20BL4dDLv4DPQ5sXs9eprvxJpSiJfgbZH.jpg&quot;
        },
        {
            &quot;id&quot;: 50,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Nappy&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/VRPpvljJDcacQIskmAJvZMPYWl9ujI3bhA2JB1Q7.jpg&quot;
        },
        {
            &quot;id&quot;: 12,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Nappy locs&quot;,
            &quot;subtitle&quot;: &quot;Micro twist&quot;,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;35000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/vedEZU2gyNG5lhbwgBc8koinPEvtjSf05zaV182b.jpg&quot;
        },
        {
            &quot;id&quot;: 43,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;natte&quot;,
            &quot;title&quot;: &quot;natte&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;12000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/g8ThaCRGh3oB5SwQiYrVEvnOKRVhrMwMj1bG1TxA.png&quot;
        },
        {
            &quot;id&quot;: 19,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Natte chic&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/MhqbJiDaIf33dQuFYa1d7TCwaHXH6PMCYAWzB2ke.png&quot;
        },
        {
            &quot;id&quot;: 39,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;soins&quot;,
            &quot;title&quot;: &quot;Shampoing et d&eacute;melant &agrave; l&#039;aloe vera&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/FGcc1kiSKParz4HRyUBoE0bbzajyoWUIoe043hEr.png&quot;
        },
        {
            &quot;id&quot;: 28,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;spa&quot;,
            &quot;title&quot;: &quot;soin de beaut&eacute;&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: null,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/EA4t6e9NE6lufpNrweMxKaJDdbO3nZuRRGpkBPd7.jpg&quot;
        },
        {
            &quot;id&quot;: 26,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;spa&quot;,
            &quot;title&quot;: &quot;soin de beaut&eacute;&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;20000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/7xWrS7cuHvC7QnQ1EjTu2rxCZsIS84rADfsttyVE.png&quot;
        },
        {
            &quot;id&quot;: 29,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;spa&quot;,
            &quot;title&quot;: &quot;soin de visage&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: null,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/LgTOdDFdUlCUqxt0xBU2VwHhvDzHQ4JIOrgIZSAQ.jpg&quot;
        },
        {
            &quot;id&quot;: 21,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;spa&quot;,
            &quot;title&quot;: &quot;Soin de visage&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/WjWcicmeKiKyljUdJsmYn0haCKyRS6cZMcbMvxZB.png&quot;
        },
        {
            &quot;id&quot;: 27,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;spa&quot;,
            &quot;title&quot;: &quot;spa s&eacute;ance&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/FachvNAVZZQTh1SmelxmPhsiZx0DC8v2jZXfk9eg.png&quot;
        },
        {
            &quot;id&quot;: 44,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;natte&quot;,
            &quot;title&quot;: &quot;tout m&eacute;che&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/j2AafyMusMSkwYnhYexMyKbOHdfDcQe3qcgLgdjJ.png&quot;
        },
        {
            &quot;id&quot;: 25,
            &quot;section_key&quot;: &quot;realisations&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;twist&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;45000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/NLjjJ5N55u42DW2JetkQqFqZPw06RwhciAOIwjJQ.png&quot;
        },
        {
            &quot;id&quot;: 47,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;twist&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;35000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/3PmZ2woE553O4E1gwAhd6N5pAOiXZ6CFzpMhqnFz.png&quot;
        },
        {
            &quot;id&quot;: 49,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;twist&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;15000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/7CbB1RxfvCQZFUFSjQUL5xxM4HprWuRJV0lqCiBw.png&quot;
        },
        {
            &quot;id&quot;: 51,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;twist&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;35000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/PzL7Fod6i7welQXHIdBeoZJRgy8tqgC7U7doMXS3.png&quot;
        },
        {
            &quot;id&quot;: 52,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;twist&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;25000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/FXTJoRTU1bfo84WnZ6STUHZ2WJDS8tSAbP0xu8Kh.png&quot;
        },
        {
            &quot;id&quot;: 41,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;twist&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: &quot;5h&quot;,
            &quot;price&quot;: null,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/eQBKWXumT8hO9IKoEkJI0QVbhapa1u6fSO4eJEOI.png&quot;
        },
        {
            &quot;id&quot;: 56,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;twist&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;35000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/QfcZeKtargBCDa3RVkj2qs7hmjgXyF68Hx8sNKer.jpg&quot;
        },
        {
            &quot;id&quot;: 53,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;autre&quot;,
            &quot;title&quot;: &quot;twist perl&eacute;&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;10000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/h1LL2mZLN1aXvWYY9KlKYHb0mS2AtQneSLR3agKY.png&quot;
        },
        {
            &quot;id&quot;: 48,
            &quot;section_key&quot;: &quot;coiffures&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;twist red&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: &quot;35000&quot;,
            &quot;sort_order&quot;: 0,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/Lqg2RsXAyEp2hEuBsZAq8ZeRb3A32VSh36ALhhrF.jpg&quot;
        },
        {
            &quot;id&quot;: 6,
            &quot;section_key&quot;: &quot;galerie&quot;,
            &quot;category_key&quot;: &quot;coiffure&quot;,
            &quot;title&quot;: &quot;Micro Twist&quot;,
            &quot;subtitle&quot;: null,
            &quot;duration&quot;: null,
            &quot;price&quot;: null,
            &quot;sort_order&quot;: 1,
            &quot;is_active&quot;: true,
            &quot;image_url&quot;: &quot;http://127.0.0.1:8000/storage/beauty-services/zAr1zppelkWe1Ys6l9BCfwcstwb2AlrBYvQVNUKB.png&quot;
        }
    ]
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-beauty-services" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-beauty-services"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-beauty-services"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-beauty-services" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-beauty-services">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-beauty-services" data-method="GET"
      data-path="api/beauty-services"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-beauty-services', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-beauty-services"
                    onclick="tryItOut('GETapi-beauty-services');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-beauty-services"
                    onclick="cancelTryOut('GETapi-beauty-services');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-beauty-services"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/beauty-services</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-beauty-services"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-beauty-services"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETapi-promos-bar">GET api/promos/bar</h2>

<p>
</p>



<span id="example-requests-GETapi-promos-bar">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/promos/bar" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/promos/bar"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-promos-bar">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;text&quot;: &quot;la vie est belle&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-promos-bar" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-promos-bar"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-promos-bar"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-promos-bar" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-promos-bar">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-promos-bar" data-method="GET"
      data-path="api/promos/bar"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-promos-bar', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-promos-bar"
                    onclick="tryItOut('GETapi-promos-bar');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-promos-bar"
                    onclick="cancelTryOut('GETapi-promos-bar');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-promos-bar"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/promos/bar</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-promos-bar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-promos-bar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETapi-promos-active">GET api/promos/active</h2>

<p>
</p>



<span id="example-requests-GETapi-promos-active">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/promos/active" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/promos/active"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-promos-active">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: [
        {
            &quot;id&quot;: 2,
            &quot;code&quot;: &quot;DAVBOTE&quot;,
            &quot;discount_type&quot;: &quot;percent&quot;,
            &quot;value&quot;: &quot;15.00&quot;,
            &quot;label&quot;: &quot;-15.00%&quot;,
            &quot;product_ids&quot;: [
                9,
                12,
                15,
                22
            ]
        }
    ]
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-promos-active" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-promos-active"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-promos-active"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-promos-active" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-promos-active">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-promos-active" data-method="GET"
      data-path="api/promos/active"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-promos-active', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-promos-active"
                    onclick="tryItOut('GETapi-promos-active');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-promos-active"
                    onclick="cancelTryOut('GETapi-promos-active');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-promos-active"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/promos/active</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-promos-active"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-promos-active"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTapi-promos-validate">POST api/promos/validate</h2>

<p>
</p>



<span id="example-requests-POSTapi-promos-validate">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/promos/validate" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"code\": \"architecto\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/promos/validate"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "code": "architecto"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-promos-validate">
</span>
<span id="execution-results-POSTapi-promos-validate" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-promos-validate"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-promos-validate"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-promos-validate" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-promos-validate">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-promos-validate" data-method="POST"
      data-path="api/promos/validate"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-promos-validate', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-promos-validate"
                    onclick="tryItOut('POSTapi-promos-validate');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-promos-validate"
                    onclick="cancelTryOut('POSTapi-promos-validate');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-promos-validate"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/promos/validate</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-promos-validate"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-promos-validate"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>code</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="code"                data-endpoint="POSTapi-promos-validate"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
        </form>

                    <h2 id="endpoints-POSTapi-payment-initiate">POST api/payment/initiate</h2>

<p>
</p>



<span id="example-requests-POSTapi-payment-initiate">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/payment/initiate" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"items\": [
        {
            \"title\": \"architecto\",
            \"quantity\": 22,
            \"unitPrice\": 84
        }
    ],
    \"commune\": \"b\",
    \"delivery_fee\": 39,
    \"client_name\": \"g\",
    \"client_phone\": \"z\",
    \"shipping_address\": \"m\",
    \"payment_channel\": \"mobile\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/payment/initiate"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "items": [
        {
            "title": "architecto",
            "quantity": 22,
            "unitPrice": 84
        }
    ],
    "commune": "b",
    "delivery_fee": 39,
    "client_name": "g",
    "client_phone": "z",
    "shipping_address": "m",
    "payment_channel": "mobile"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-payment-initiate">
</span>
<span id="execution-results-POSTapi-payment-initiate" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-payment-initiate"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-payment-initiate"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-payment-initiate" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-payment-initiate">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-payment-initiate" data-method="POST"
      data-path="api/payment/initiate"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-payment-initiate', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-payment-initiate"
                    onclick="tryItOut('POSTapi-payment-initiate');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-payment-initiate"
                    onclick="cancelTryOut('POSTapi-payment-initiate');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-payment-initiate"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/payment/initiate</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-payment-initiate"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-payment-initiate"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
        <details>
            <summary style="padding-bottom: 10px;">
                <b style="line-height: 2;"><code>items</code></b>&nbsp;&nbsp;
<small>object[]</small>&nbsp;
 &nbsp;
 &nbsp;
<br>
<p>Must have at least 1 items.</p>
            </summary>
                                                <div style="margin-left: 14px; clear: unset;">
                        <b style="line-height: 2;"><code>title</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="items.0.title"                data-endpoint="POSTapi-payment-initiate"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
                    </div>
                                                                <div style="margin-left: 14px; clear: unset;">
                        <b style="line-height: 2;"><code>quantity</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="items.0.quantity"                data-endpoint="POSTapi-payment-initiate"
               value="22"
               data-component="body">
    <br>
<p>Must be at least 1. Example: <code>22</code></p>
                    </div>
                                                                <div style="margin-left: 14px; clear: unset;">
                        <b style="line-height: 2;"><code>unitPrice</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="items.0.unitPrice"                data-endpoint="POSTapi-payment-initiate"
               value="84"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>84</code></p>
                    </div>
                                    </details>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>commune</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="commune"                data-endpoint="POSTapi-payment-initiate"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 100 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>delivery_fee</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="delivery_fee"                data-endpoint="POSTapi-payment-initiate"
               value="39"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>39</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>client_name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="client_name"                data-endpoint="POSTapi-payment-initiate"
               value="g"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>g</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>client_phone</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="client_phone"                data-endpoint="POSTapi-payment-initiate"
               value="z"
               data-component="body">
    <br>
<p>Must not be greater than 30 characters. Example: <code>z</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>shipping_address</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="shipping_address"                data-endpoint="POSTapi-payment-initiate"
               value="m"
               data-component="body">
    <br>
<p>Must not be greater than 500 characters. Example: <code>m</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>payment_channel</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="payment_channel"                data-endpoint="POSTapi-payment-initiate"
               value="mobile"
               data-component="body">
    <br>
<p>Example: <code>mobile</code></p>
Must be one of:
<ul style="list-style-type: square;"><li><code>mobile</code></li> <li><code>card</code></li></ul>
        </div>
        </form>

                    <h2 id="endpoints-POSTapi-payment-mobile-initiate">POST api/payment/mobile-initiate</h2>

<p>
</p>



<span id="example-requests-POSTapi-payment-mobile-initiate">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/payment/mobile-initiate" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"items\": [
        {
            \"title\": \"architecto\",
            \"quantity\": 22,
            \"unitPrice\": 84
        }
    ],
    \"commune\": \"b\",
    \"delivery_fee\": 39,
    \"client_name\": \"g\",
    \"client_phone\": \"z\",
    \"shipping_address\": \"m\",
    \"network\": \"moov-ci\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/payment/mobile-initiate"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "items": [
        {
            "title": "architecto",
            "quantity": 22,
            "unitPrice": 84
        }
    ],
    "commune": "b",
    "delivery_fee": 39,
    "client_name": "g",
    "client_phone": "z",
    "shipping_address": "m",
    "network": "moov-ci"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-payment-mobile-initiate">
</span>
<span id="execution-results-POSTapi-payment-mobile-initiate" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-payment-mobile-initiate"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-payment-mobile-initiate"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-payment-mobile-initiate" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-payment-mobile-initiate">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-payment-mobile-initiate" data-method="POST"
      data-path="api/payment/mobile-initiate"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-payment-mobile-initiate', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-payment-mobile-initiate"
                    onclick="tryItOut('POSTapi-payment-mobile-initiate');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-payment-mobile-initiate"
                    onclick="cancelTryOut('POSTapi-payment-mobile-initiate');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-payment-mobile-initiate"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/payment/mobile-initiate</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-payment-mobile-initiate"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-payment-mobile-initiate"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
        <details>
            <summary style="padding-bottom: 10px;">
                <b style="line-height: 2;"><code>items</code></b>&nbsp;&nbsp;
<small>object[]</small>&nbsp;
 &nbsp;
 &nbsp;
<br>
<p>Must have at least 1 items.</p>
            </summary>
                                                <div style="margin-left: 14px; clear: unset;">
                        <b style="line-height: 2;"><code>title</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="items.0.title"                data-endpoint="POSTapi-payment-mobile-initiate"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
                    </div>
                                                                <div style="margin-left: 14px; clear: unset;">
                        <b style="line-height: 2;"><code>quantity</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="items.0.quantity"                data-endpoint="POSTapi-payment-mobile-initiate"
               value="22"
               data-component="body">
    <br>
<p>Must be at least 1. Example: <code>22</code></p>
                    </div>
                                                                <div style="margin-left: 14px; clear: unset;">
                        <b style="line-height: 2;"><code>unitPrice</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="items.0.unitPrice"                data-endpoint="POSTapi-payment-mobile-initiate"
               value="84"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>84</code></p>
                    </div>
                                    </details>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>commune</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="commune"                data-endpoint="POSTapi-payment-mobile-initiate"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 100 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>delivery_fee</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="delivery_fee"                data-endpoint="POSTapi-payment-mobile-initiate"
               value="39"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>39</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>client_name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="client_name"                data-endpoint="POSTapi-payment-mobile-initiate"
               value="g"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>g</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>client_phone</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="client_phone"                data-endpoint="POSTapi-payment-mobile-initiate"
               value="z"
               data-component="body">
    <br>
<p>Must not be greater than 30 characters. Example: <code>z</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>shipping_address</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="shipping_address"                data-endpoint="POSTapi-payment-mobile-initiate"
               value="m"
               data-component="body">
    <br>
<p>Must not be greater than 500 characters. Example: <code>m</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>network</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="network"                data-endpoint="POSTapi-payment-mobile-initiate"
               value="moov-ci"
               data-component="body">
    <br>
<p>Example: <code>moov-ci</code></p>
Must be one of:
<ul style="list-style-type: square;"><li><code>wave-ci</code></li> <li><code>orange-money-ci</code></li> <li><code>mtn-ci</code></li> <li><code>moov-ci</code></li></ul>
        </div>
        </form>

                    <h2 id="endpoints-POSTapi-logout">POST api/logout</h2>

<p>
</p>



<span id="example-requests-POSTapi-logout">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/logout" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/logout"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-logout">
</span>
<span id="execution-results-POSTapi-logout" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-logout"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-logout"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-logout" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-logout">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-logout" data-method="POST"
      data-path="api/logout"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-logout', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-logout"
                    onclick="tryItOut('POSTapi-logout');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-logout"
                    onclick="cancelTryOut('POSTapi-logout');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-logout"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/logout</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-logout"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-logout"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETapi-user">GET api/user</h2>

<p>
</p>



<span id="example-requests-GETapi-user">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/user" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/user"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-user">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-user" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-user"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-user"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-user" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-user">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-user" data-method="GET"
      data-path="api/user"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-user', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-user"
                    onclick="tryItOut('GETapi-user');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-user"
                    onclick="cancelTryOut('GETapi-user');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-user"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/user</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-user"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-user"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-PUTapi-user-profile">PUT api/user/profile</h2>

<p>
</p>



<span id="example-requests-PUTapi-user-profile">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://127.0.0.1:8000/api/user/profile" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"name\": \"b\",
    \"email\": \"zbailey@example.net\",
    \"phone\": \"i\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/user/profile"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "b",
    "email": "zbailey@example.net",
    "phone": "i"
};

fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTapi-user-profile">
</span>
<span id="execution-results-PUTapi-user-profile" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTapi-user-profile"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTapi-user-profile"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTapi-user-profile" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTapi-user-profile">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTapi-user-profile" data-method="PUT"
      data-path="api/user/profile"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTapi-user-profile', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTapi-user-profile"
                    onclick="tryItOut('PUTapi-user-profile');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTapi-user-profile"
                    onclick="cancelTryOut('PUTapi-user-profile');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTapi-user-profile"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>api/user/profile</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTapi-user-profile"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTapi-user-profile"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="PUTapi-user-profile"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="PUTapi-user-profile"
               value="zbailey@example.net"
               data-component="body">
    <br>
<p>Must be a valid email address. Example: <code>zbailey@example.net</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>phone</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="phone"                data-endpoint="PUTapi-user-profile"
               value="i"
               data-component="body">
    <br>
<p>Must not be greater than 30 characters. Example: <code>i</code></p>
        </div>
        </form>

                    <h2 id="endpoints-PUTapi-user-password">PUT api/user/password</h2>

<p>
</p>



<span id="example-requests-PUTapi-user-password">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://127.0.0.1:8000/api/user/password" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"current_password\": \"architecto\",
    \"password\": \"]|{+-0pBNvYg\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/user/password"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "current_password": "architecto",
    "password": "]|{+-0pBNvYg"
};

fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTapi-user-password">
</span>
<span id="execution-results-PUTapi-user-password" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTapi-user-password"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTapi-user-password"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTapi-user-password" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTapi-user-password">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTapi-user-password" data-method="PUT"
      data-path="api/user/password"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTapi-user-password', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTapi-user-password"
                    onclick="tryItOut('PUTapi-user-password');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTapi-user-password"
                    onclick="cancelTryOut('PUTapi-user-password');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTapi-user-password"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>api/user/password</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTapi-user-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTapi-user-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>current_password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="current_password"                data-endpoint="PUTapi-user-password"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="PUTapi-user-password"
               value="]|{+-0pBNvYg"
               data-component="body">
    <br>
<p>Must be at least 8 characters. Example: <code>]|{+-0pBNvYg</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETapi-orders-my">GET api/orders/my</h2>

<p>
</p>



<span id="example-requests-GETapi-orders-my">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/orders/my" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/orders/my"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-orders-my">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-orders-my" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-orders-my"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-orders-my"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-orders-my" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-orders-my">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-orders-my" data-method="GET"
      data-path="api/orders/my"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-orders-my', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-orders-my"
                    onclick="tryItOut('GETapi-orders-my');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-orders-my"
                    onclick="cancelTryOut('GETapi-orders-my');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-orders-my"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/orders/my</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-orders-my"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-orders-my"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETapi-rdv-my">GET api/rdv/my</h2>

<p>
</p>



<span id="example-requests-GETapi-rdv-my">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/rdv/my" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/rdv/my"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-rdv-my">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-rdv-my" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-rdv-my"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-rdv-my"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-rdv-my" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-rdv-my">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-rdv-my" data-method="GET"
      data-path="api/rdv/my"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-rdv-my', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-rdv-my"
                    onclick="tryItOut('GETapi-rdv-my');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-rdv-my"
                    onclick="cancelTryOut('GETapi-rdv-my');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-rdv-my"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/rdv/my</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-rdv-my"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-rdv-my"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETapi-rdv">GET api/rdv</h2>

<p>
</p>



<span id="example-requests-GETapi-rdv">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/rdv" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/rdv"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-rdv">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-rdv" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-rdv"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-rdv"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-rdv" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-rdv">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-rdv" data-method="GET"
      data-path="api/rdv"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-rdv', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-rdv"
                    onclick="tryItOut('GETapi-rdv');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-rdv"
                    onclick="cancelTryOut('GETapi-rdv');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-rdv"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/rdv</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-rdv"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-rdv"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTapi-rdv">POST api/rdv</h2>

<p>
</p>



<span id="example-requests-POSTapi-rdv">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/rdv" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"service\": \"b\",
    \"category\": \"conseil\",
    \"date\": \"2026-06-29T15:29:05\",
    \"time\": \"architecto\",
    \"first_name\": \"n\",
    \"last_name\": \"g\",
    \"phone\": \"z\",
    \"email\": \"rempel.chadrick@example.org\",
    \"notes\": \"l\",
    \"nb_persons\": 4,
    \"payment_method\": \"mobile\",
    \"advance_channel\": \"card\",
    \"network\": \"mtn-ci\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/rdv"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "service": "b",
    "category": "conseil",
    "date": "2026-06-29T15:29:05",
    "time": "architecto",
    "first_name": "n",
    "last_name": "g",
    "phone": "z",
    "email": "rempel.chadrick@example.org",
    "notes": "l",
    "nb_persons": 4,
    "payment_method": "mobile",
    "advance_channel": "card",
    "network": "mtn-ci"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-rdv">
</span>
<span id="execution-results-POSTapi-rdv" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-rdv"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-rdv"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-rdv" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-rdv">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-rdv" data-method="POST"
      data-path="api/rdv"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-rdv', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-rdv"
                    onclick="tryItOut('POSTapi-rdv');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-rdv"
                    onclick="cancelTryOut('POSTapi-rdv');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-rdv"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/rdv</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-rdv"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-rdv"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>service</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="service"                data-endpoint="POSTapi-rdv"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>category</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="category"                data-endpoint="POSTapi-rdv"
               value="conseil"
               data-component="body">
    <br>
<p>Example: <code>conseil</code></p>
Must be one of:
<ul style="list-style-type: square;"><li><code>coiffure</code></li> <li><code>ongerie</code></li> <li><code>spa</code></li> <li><code>conseil</code></li></ul>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>date</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="date"                data-endpoint="POSTapi-rdv"
               value="2026-06-29T15:29:05"
               data-component="body">
    <br>
<p>Must be a valid date. Example: <code>2026-06-29T15:29:05</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>time</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="time"                data-endpoint="POSTapi-rdv"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>first_name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="first_name"                data-endpoint="POSTapi-rdv"
               value="n"
               data-component="body">
    <br>
<p>Must not be greater than 100 characters. Example: <code>n</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>last_name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="last_name"                data-endpoint="POSTapi-rdv"
               value="g"
               data-component="body">
    <br>
<p>Must not be greater than 100 characters. Example: <code>g</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>phone</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="phone"                data-endpoint="POSTapi-rdv"
               value="z"
               data-component="body">
    <br>
<p>Must not be greater than 30 characters. Example: <code>z</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="POSTapi-rdv"
               value="rempel.chadrick@example.org"
               data-component="body">
    <br>
<p>Must be a valid email address. Must not be greater than 255 characters. Example: <code>rempel.chadrick@example.org</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>notes</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="notes"                data-endpoint="POSTapi-rdv"
               value="l"
               data-component="body">
    <br>
<p>Must not be greater than 1000 characters. Example: <code>l</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>nb_persons</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="nb_persons"                data-endpoint="POSTapi-rdv"
               value="4"
               data-component="body">
    <br>
<p>Must be at least 1. Must not be greater than 20. Example: <code>4</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>payment_method</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="payment_method"                data-endpoint="POSTapi-rdv"
               value="mobile"
               data-component="body">
    <br>
<p>Example: <code>mobile</code></p>
Must be one of:
<ul style="list-style-type: square;"><li><code>mobile</code></li> <li><code>card</code></li> <li><code>cash</code></li></ul>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>advance_channel</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="advance_channel"                data-endpoint="POSTapi-rdv"
               value="card"
               data-component="body">
    <br>
<p>Example: <code>card</code></p>
Must be one of:
<ul style="list-style-type: square;"><li><code>mobile</code></li> <li><code>card</code></li></ul>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>network</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="network"                data-endpoint="POSTapi-rdv"
               value="mtn-ci"
               data-component="body">
    <br>
<p>Example: <code>mtn-ci</code></p>
Must be one of:
<ul style="list-style-type: square;"><li><code>wave-ci</code></li> <li><code>orange-money-ci</code></li> <li><code>mtn-ci</code></li> <li><code>moov-ci</code></li></ul>
        </div>
        </form>

                    <h2 id="endpoints-PATCHapi-rdv--rdv_id--status">PATCH api/rdv/{rdv_id}/status</h2>

<p>
</p>



<span id="example-requests-PATCHapi-rdv--rdv_id--status">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PATCH \
    "http://127.0.0.1:8000/api/rdv/1/status" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"status\": \"pending\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/rdv/1/status"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "status": "pending"
};

fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PATCHapi-rdv--rdv_id--status">
</span>
<span id="execution-results-PATCHapi-rdv--rdv_id--status" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PATCHapi-rdv--rdv_id--status"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PATCHapi-rdv--rdv_id--status"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PATCHapi-rdv--rdv_id--status" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PATCHapi-rdv--rdv_id--status">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PATCHapi-rdv--rdv_id--status" data-method="PATCH"
      data-path="api/rdv/{rdv_id}/status"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PATCHapi-rdv--rdv_id--status', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PATCHapi-rdv--rdv_id--status"
                    onclick="tryItOut('PATCHapi-rdv--rdv_id--status');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PATCHapi-rdv--rdv_id--status"
                    onclick="cancelTryOut('PATCHapi-rdv--rdv_id--status');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PATCHapi-rdv--rdv_id--status"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-purple">PATCH</small>
            <b><code>api/rdv/{rdv_id}/status</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PATCHapi-rdv--rdv_id--status"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PATCHapi-rdv--rdv_id--status"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>rdv_id</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="rdv_id"                data-endpoint="PATCHapi-rdv--rdv_id--status"
               value="1"
               data-component="url">
    <br>
<p>The ID of the rdv. Example: <code>1</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>status</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="status"                data-endpoint="PATCHapi-rdv--rdv_id--status"
               value="pending"
               data-component="body">
    <br>
<p>Example: <code>pending</code></p>
Must be one of:
<ul style="list-style-type: square;"><li><code>pending</code></li> <li><code>confirmed</code></li> <li><code>done</code></li> <li><code>cancelled</code></li> <li><code>awaiting</code></li></ul>
        </div>
        </form>

                    <h2 id="endpoints-GETapi-rdv-notifications">GET api/rdv/notifications</h2>

<p>
</p>



<span id="example-requests-GETapi-rdv-notifications">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/rdv/notifications" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/rdv/notifications"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-rdv-notifications">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-rdv-notifications" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-rdv-notifications"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-rdv-notifications"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-rdv-notifications" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-rdv-notifications">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-rdv-notifications" data-method="GET"
      data-path="api/rdv/notifications"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-rdv-notifications', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-rdv-notifications"
                    onclick="tryItOut('GETapi-rdv-notifications');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-rdv-notifications"
                    onclick="cancelTryOut('GETapi-rdv-notifications');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-rdv-notifications"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/rdv/notifications</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-rdv-notifications"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-rdv-notifications"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTapi-rdv-mark-notified">POST api/rdv/mark-notified</h2>

<p>
</p>



<span id="example-requests-POSTapi-rdv-mark-notified">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/rdv/mark-notified" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/rdv/mark-notified"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-rdv-mark-notified">
</span>
<span id="execution-results-POSTapi-rdv-mark-notified" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-rdv-mark-notified"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-rdv-mark-notified"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-rdv-mark-notified" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-rdv-mark-notified">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-rdv-mark-notified" data-method="POST"
      data-path="api/rdv/mark-notified"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-rdv-mark-notified', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-rdv-mark-notified"
                    onclick="tryItOut('POSTapi-rdv-mark-notified');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-rdv-mark-notified"
                    onclick="cancelTryOut('POSTapi-rdv-mark-notified');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-rdv-mark-notified"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/rdv/mark-notified</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-rdv-mark-notified"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-rdv-mark-notified"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTapi-beauty-services">POST api/beauty-services</h2>

<p>
</p>



<span id="example-requests-POSTapi-beauty-services">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/beauty-services" \
    --header "Content-Type: multipart/form-data" \
    --header "Accept: application/json" \
    --form "section_key=b"\
    --form "category_key=n"\
    --form "title=g"\
    --form "subtitle=z"\
    --form "duration=m"\
    --form "price=i"\
    --form "sort_order=76"\
    --form "image=@C:\Users\desia\AppData\Local\Temp\php17E6.tmp" </code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/beauty-services"
);

const headers = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
};

const body = new FormData();
body.append('section_key', 'b');
body.append('category_key', 'n');
body.append('title', 'g');
body.append('subtitle', 'z');
body.append('duration', 'm');
body.append('price', 'i');
body.append('sort_order', '76');
body.append('image', document.querySelector('input[name="image"]').files[0]);

fetch(url, {
    method: "POST",
    headers,
    body,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-beauty-services">
</span>
<span id="execution-results-POSTapi-beauty-services" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-beauty-services"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-beauty-services"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-beauty-services" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-beauty-services">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-beauty-services" data-method="POST"
      data-path="api/beauty-services"
      data-authed="0"
      data-hasfiles="1"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-beauty-services', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-beauty-services"
                    onclick="tryItOut('POSTapi-beauty-services');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-beauty-services"
                    onclick="cancelTryOut('POSTapi-beauty-services');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-beauty-services"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/beauty-services</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-beauty-services"
               value="multipart/form-data"
               data-component="header">
    <br>
<p>Example: <code>multipart/form-data</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-beauty-services"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>section_key</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="section_key"                data-endpoint="POSTapi-beauty-services"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 100 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>category_key</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="category_key"                data-endpoint="POSTapi-beauty-services"
               value="n"
               data-component="body">
    <br>
<p>Must not be greater than 100 characters. Example: <code>n</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>title</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="title"                data-endpoint="POSTapi-beauty-services"
               value="g"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>g</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>subtitle</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="subtitle"                data-endpoint="POSTapi-beauty-services"
               value="z"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>z</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>duration</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="duration"                data-endpoint="POSTapi-beauty-services"
               value="m"
               data-component="body">
    <br>
<p>Must not be greater than 50 characters. Example: <code>m</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>price</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="price"                data-endpoint="POSTapi-beauty-services"
               value="i"
               data-component="body">
    <br>
<p>Must not be greater than 50 characters. Example: <code>i</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>sort_order</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="sort_order"                data-endpoint="POSTapi-beauty-services"
               value="76"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>76</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>image</code></b>&nbsp;&nbsp;
<small>file</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="file" style="display: none"
                              name="image"                data-endpoint="POSTapi-beauty-services"
               value=""
               data-component="body">
    <br>
<p>Must be an image. Must not be greater than 4096 kilobytes. Example: <code>C:\Users\desia\AppData\Local\Temp\php17E6.tmp</code></p>
        </div>
        </form>

                    <h2 id="endpoints-PUTapi-beauty-services--beautyService_id-">PUT api/beauty-services/{beautyService_id}</h2>

<p>
</p>



<span id="example-requests-PUTapi-beauty-services--beautyService_id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://127.0.0.1:8000/api/beauty-services/6" \
    --header "Content-Type: multipart/form-data" \
    --header "Accept: application/json" \
    --form "section_key=b"\
    --form "category_key=n"\
    --form "title=g"\
    --form "subtitle=z"\
    --form "duration=m"\
    --form "price=i"\
    --form "sort_order=76"\
    --form "is_active="\
    --form "image=@C:\Users\desia\AppData\Local\Temp\php1806.tmp" </code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/beauty-services/6"
);

const headers = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
};

const body = new FormData();
body.append('section_key', 'b');
body.append('category_key', 'n');
body.append('title', 'g');
body.append('subtitle', 'z');
body.append('duration', 'm');
body.append('price', 'i');
body.append('sort_order', '76');
body.append('is_active', '');
body.append('image', document.querySelector('input[name="image"]').files[0]);

fetch(url, {
    method: "PUT",
    headers,
    body,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTapi-beauty-services--beautyService_id-">
</span>
<span id="execution-results-PUTapi-beauty-services--beautyService_id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTapi-beauty-services--beautyService_id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTapi-beauty-services--beautyService_id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTapi-beauty-services--beautyService_id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTapi-beauty-services--beautyService_id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTapi-beauty-services--beautyService_id-" data-method="PUT"
      data-path="api/beauty-services/{beautyService_id}"
      data-authed="0"
      data-hasfiles="1"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTapi-beauty-services--beautyService_id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTapi-beauty-services--beautyService_id-"
                    onclick="tryItOut('PUTapi-beauty-services--beautyService_id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTapi-beauty-services--beautyService_id-"
                    onclick="cancelTryOut('PUTapi-beauty-services--beautyService_id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTapi-beauty-services--beautyService_id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>api/beauty-services/{beautyService_id}</code></b>
        </p>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/beauty-services/{beautyService_id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTapi-beauty-services--beautyService_id-"
               value="multipart/form-data"
               data-component="header">
    <br>
<p>Example: <code>multipart/form-data</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTapi-beauty-services--beautyService_id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>beautyService_id</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="beautyService_id"                data-endpoint="PUTapi-beauty-services--beautyService_id-"
               value="6"
               data-component="url">
    <br>
<p>The ID of the beautyService. Example: <code>6</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>section_key</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="section_key"                data-endpoint="PUTapi-beauty-services--beautyService_id-"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 100 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>category_key</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="category_key"                data-endpoint="PUTapi-beauty-services--beautyService_id-"
               value="n"
               data-component="body">
    <br>
<p>Must not be greater than 100 characters. Example: <code>n</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>title</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="title"                data-endpoint="PUTapi-beauty-services--beautyService_id-"
               value="g"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>g</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>subtitle</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="subtitle"                data-endpoint="PUTapi-beauty-services--beautyService_id-"
               value="z"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>z</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>duration</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="duration"                data-endpoint="PUTapi-beauty-services--beautyService_id-"
               value="m"
               data-component="body">
    <br>
<p>Must not be greater than 50 characters. Example: <code>m</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>price</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="price"                data-endpoint="PUTapi-beauty-services--beautyService_id-"
               value="i"
               data-component="body">
    <br>
<p>Must not be greater than 50 characters. Example: <code>i</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>sort_order</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="sort_order"                data-endpoint="PUTapi-beauty-services--beautyService_id-"
               value="76"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>76</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>is_active</code></b>&nbsp;&nbsp;
<small>boolean</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <label data-endpoint="PUTapi-beauty-services--beautyService_id-" style="display: none">
            <input type="radio" name="is_active"
                   value="true"
                   data-endpoint="PUTapi-beauty-services--beautyService_id-"
                   data-component="body"             >
            <code>true</code>
        </label>
        <label data-endpoint="PUTapi-beauty-services--beautyService_id-" style="display: none">
            <input type="radio" name="is_active"
                   value="false"
                   data-endpoint="PUTapi-beauty-services--beautyService_id-"
                   data-component="body"             >
            <code>false</code>
        </label>
    <br>
<p>Example: <code>false</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>image</code></b>&nbsp;&nbsp;
<small>file</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="file" style="display: none"
                              name="image"                data-endpoint="PUTapi-beauty-services--beautyService_id-"
               value=""
               data-component="body">
    <br>
<p>Must be an image. Must not be greater than 4096 kilobytes. Example: <code>C:\Users\desia\AppData\Local\Temp\php1806.tmp</code></p>
        </div>
        </form>

                    <h2 id="endpoints-DELETEapi-beauty-services--beautyService_id-">DELETE api/beauty-services/{beautyService_id}</h2>

<p>
</p>



<span id="example-requests-DELETEapi-beauty-services--beautyService_id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://127.0.0.1:8000/api/beauty-services/6" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/beauty-services/6"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEapi-beauty-services--beautyService_id-">
</span>
<span id="execution-results-DELETEapi-beauty-services--beautyService_id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEapi-beauty-services--beautyService_id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEapi-beauty-services--beautyService_id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEapi-beauty-services--beautyService_id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEapi-beauty-services--beautyService_id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEapi-beauty-services--beautyService_id-" data-method="DELETE"
      data-path="api/beauty-services/{beautyService_id}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEapi-beauty-services--beautyService_id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEapi-beauty-services--beautyService_id-"
                    onclick="tryItOut('DELETEapi-beauty-services--beautyService_id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEapi-beauty-services--beautyService_id-"
                    onclick="cancelTryOut('DELETEapi-beauty-services--beautyService_id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEapi-beauty-services--beautyService_id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>api/beauty-services/{beautyService_id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEapi-beauty-services--beautyService_id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEapi-beauty-services--beautyService_id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>beautyService_id</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="beautyService_id"                data-endpoint="DELETEapi-beauty-services--beautyService_id-"
               value="6"
               data-component="url">
    <br>
<p>The ID of the beautyService. Example: <code>6</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETapi-promos">GET api/promos</h2>

<p>
</p>



<span id="example-requests-GETapi-promos">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/promos" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/promos"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-promos">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-promos" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-promos"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-promos"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-promos" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-promos">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-promos" data-method="GET"
      data-path="api/promos"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-promos', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-promos"
                    onclick="tryItOut('GETapi-promos');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-promos"
                    onclick="cancelTryOut('GETapi-promos');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-promos"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/promos</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-promos"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-promos"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTapi-promos">POST api/promos</h2>

<p>
</p>



<span id="example-requests-POSTapi-promos">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/promos" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"code\": \"architecto\",
    \"discount_type\": \"amount\",
    \"value\": 39,
    \"start_date\": \"2026-06-29T15:29:05\",
    \"end_date\": \"2052-07-22\",
    \"is_active\": true,
    \"usage_limit\": 22,
    \"product_ids\": [
        16
    ]
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/promos"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "code": "architecto",
    "discount_type": "amount",
    "value": 39,
    "start_date": "2026-06-29T15:29:05",
    "end_date": "2052-07-22",
    "is_active": true,
    "usage_limit": 22,
    "product_ids": [
        16
    ]
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-promos">
</span>
<span id="execution-results-POSTapi-promos" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-promos"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-promos"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-promos" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-promos">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-promos" data-method="POST"
      data-path="api/promos"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-promos', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-promos"
                    onclick="tryItOut('POSTapi-promos');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-promos"
                    onclick="cancelTryOut('POSTapi-promos');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-promos"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/promos</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-promos"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-promos"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>code</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="code"                data-endpoint="POSTapi-promos"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>discount_type</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="discount_type"                data-endpoint="POSTapi-promos"
               value="amount"
               data-component="body">
    <br>
<p>Example: <code>amount</code></p>
Must be one of:
<ul style="list-style-type: square;"><li><code>percent</code></li> <li><code>amount</code></li></ul>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>value</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="value"                data-endpoint="POSTapi-promos"
               value="39"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>39</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>start_date</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="start_date"                data-endpoint="POSTapi-promos"
               value="2026-06-29T15:29:05"
               data-component="body">
    <br>
<p>Must be a valid date. Example: <code>2026-06-29T15:29:05</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>end_date</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="end_date"                data-endpoint="POSTapi-promos"
               value="2052-07-22"
               data-component="body">
    <br>
<p>Must be a valid date. Must be a date after or equal to <code>start_date</code>. Example: <code>2052-07-22</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>is_active</code></b>&nbsp;&nbsp;
<small>boolean</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <label data-endpoint="POSTapi-promos" style="display: none">
            <input type="radio" name="is_active"
                   value="true"
                   data-endpoint="POSTapi-promos"
                   data-component="body"             >
            <code>true</code>
        </label>
        <label data-endpoint="POSTapi-promos" style="display: none">
            <input type="radio" name="is_active"
                   value="false"
                   data-endpoint="POSTapi-promos"
                   data-component="body"             >
            <code>false</code>
        </label>
    <br>
<p>Example: <code>true</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>usage_limit</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="usage_limit"                data-endpoint="POSTapi-promos"
               value="22"
               data-component="body">
    <br>
<p>Must be at least 1. Example: <code>22</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>product_ids</code></b>&nbsp;&nbsp;
<small>integer[]</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="product_ids[0]"                data-endpoint="POSTapi-promos"
               data-component="body">
        <input type="number" style="display: none"
               name="product_ids[1]"                data-endpoint="POSTapi-promos"
               data-component="body">
    <br>
<p>Must match an existing stored value.</p>
        </div>
        </form>

                    <h2 id="endpoints-PUTapi-promos--promo_id-">PUT api/promos/{promo_id}</h2>

<p>
</p>



<span id="example-requests-PUTapi-promos--promo_id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://127.0.0.1:8000/api/promos/2" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"discount_type\": \"percent\",
    \"value\": 27,
    \"start_date\": \"2026-06-29T15:29:05\",
    \"end_date\": \"2026-06-29T15:29:05\",
    \"is_active\": true,
    \"usage_limit\": 22,
    \"product_ids\": [
        16
    ]
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/promos/2"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "discount_type": "percent",
    "value": 27,
    "start_date": "2026-06-29T15:29:05",
    "end_date": "2026-06-29T15:29:05",
    "is_active": true,
    "usage_limit": 22,
    "product_ids": [
        16
    ]
};

fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTapi-promos--promo_id-">
</span>
<span id="execution-results-PUTapi-promos--promo_id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTapi-promos--promo_id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTapi-promos--promo_id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTapi-promos--promo_id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTapi-promos--promo_id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTapi-promos--promo_id-" data-method="PUT"
      data-path="api/promos/{promo_id}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTapi-promos--promo_id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTapi-promos--promo_id-"
                    onclick="tryItOut('PUTapi-promos--promo_id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTapi-promos--promo_id-"
                    onclick="cancelTryOut('PUTapi-promos--promo_id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTapi-promos--promo_id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>api/promos/{promo_id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTapi-promos--promo_id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTapi-promos--promo_id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>promo_id</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="promo_id"                data-endpoint="PUTapi-promos--promo_id-"
               value="2"
               data-component="url">
    <br>
<p>The ID of the promo. Example: <code>2</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>code</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="code"                data-endpoint="PUTapi-promos--promo_id-"
               value=""
               data-component="body">
    <br>

        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>discount_type</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="discount_type"                data-endpoint="PUTapi-promos--promo_id-"
               value="percent"
               data-component="body">
    <br>
<p>Example: <code>percent</code></p>
Must be one of:
<ul style="list-style-type: square;"><li><code>percent</code></li> <li><code>amount</code></li></ul>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>value</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="value"                data-endpoint="PUTapi-promos--promo_id-"
               value="27"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>27</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>start_date</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="start_date"                data-endpoint="PUTapi-promos--promo_id-"
               value="2026-06-29T15:29:05"
               data-component="body">
    <br>
<p>Must be a valid date. Example: <code>2026-06-29T15:29:05</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>end_date</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="end_date"                data-endpoint="PUTapi-promos--promo_id-"
               value="2026-06-29T15:29:05"
               data-component="body">
    <br>
<p>Must be a valid date. Example: <code>2026-06-29T15:29:05</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>is_active</code></b>&nbsp;&nbsp;
<small>boolean</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <label data-endpoint="PUTapi-promos--promo_id-" style="display: none">
            <input type="radio" name="is_active"
                   value="true"
                   data-endpoint="PUTapi-promos--promo_id-"
                   data-component="body"             >
            <code>true</code>
        </label>
        <label data-endpoint="PUTapi-promos--promo_id-" style="display: none">
            <input type="radio" name="is_active"
                   value="false"
                   data-endpoint="PUTapi-promos--promo_id-"
                   data-component="body"             >
            <code>false</code>
        </label>
    <br>
<p>Example: <code>true</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>usage_limit</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="usage_limit"                data-endpoint="PUTapi-promos--promo_id-"
               value="22"
               data-component="body">
    <br>
<p>Must be at least 1. Example: <code>22</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>product_ids</code></b>&nbsp;&nbsp;
<small>integer[]</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="product_ids[0]"                data-endpoint="PUTapi-promos--promo_id-"
               data-component="body">
        <input type="number" style="display: none"
               name="product_ids[1]"                data-endpoint="PUTapi-promos--promo_id-"
               data-component="body">
    <br>
<p>Must match an existing stored value.</p>
        </div>
        </form>

                    <h2 id="endpoints-DELETEapi-promos--promo_id-">DELETE api/promos/{promo_id}</h2>

<p>
</p>



<span id="example-requests-DELETEapi-promos--promo_id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://127.0.0.1:8000/api/promos/2" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/promos/2"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEapi-promos--promo_id-">
</span>
<span id="execution-results-DELETEapi-promos--promo_id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEapi-promos--promo_id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEapi-promos--promo_id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEapi-promos--promo_id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEapi-promos--promo_id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEapi-promos--promo_id-" data-method="DELETE"
      data-path="api/promos/{promo_id}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEapi-promos--promo_id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEapi-promos--promo_id-"
                    onclick="tryItOut('DELETEapi-promos--promo_id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEapi-promos--promo_id-"
                    onclick="cancelTryOut('DELETEapi-promos--promo_id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEapi-promos--promo_id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>api/promos/{promo_id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEapi-promos--promo_id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEapi-promos--promo_id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>promo_id</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="promo_id"                data-endpoint="DELETEapi-promos--promo_id-"
               value="2"
               data-component="url">
    <br>
<p>The ID of the promo. Example: <code>2</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-POSTapi-promos-bar">POST api/promos/bar</h2>

<p>
</p>



<span id="example-requests-POSTapi-promos-bar">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/promos/bar" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"text\": \"b\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/promos/bar"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "text": "b"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-promos-bar">
</span>
<span id="execution-results-POSTapi-promos-bar" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-promos-bar"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-promos-bar"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-promos-bar" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-promos-bar">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-promos-bar" data-method="POST"
      data-path="api/promos/bar"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-promos-bar', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-promos-bar"
                    onclick="tryItOut('POSTapi-promos-bar');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-promos-bar"
                    onclick="cancelTryOut('POSTapi-promos-bar');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-promos-bar"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/promos/bar</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-promos-bar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-promos-bar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>text</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="text"                data-endpoint="POSTapi-promos-bar"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 500 characters. Example: <code>b</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETapi-orders">GET api/orders</h2>

<p>
</p>



<span id="example-requests-GETapi-orders">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/orders" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/orders"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-orders">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-orders" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-orders"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-orders"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-orders" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-orders">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-orders" data-method="GET"
      data-path="api/orders"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-orders', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-orders"
                    onclick="tryItOut('GETapi-orders');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-orders"
                    onclick="cancelTryOut('GETapi-orders');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-orders"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/orders</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-orders"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-orders"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETapi-orders--order_id-">GET api/orders/{order_id}</h2>

<p>
</p>



<span id="example-requests-GETapi-orders--order_id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://127.0.0.1:8000/api/orders/2" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/orders/2"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-orders--order_id-">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: Origin
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-orders--order_id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-orders--order_id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-orders--order_id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-orders--order_id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-orders--order_id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-orders--order_id-" data-method="GET"
      data-path="api/orders/{order_id}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-orders--order_id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-orders--order_id-"
                    onclick="tryItOut('GETapi-orders--order_id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-orders--order_id-"
                    onclick="cancelTryOut('GETapi-orders--order_id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-orders--order_id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/orders/{order_id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-orders--order_id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-orders--order_id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>order_id</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="order_id"                data-endpoint="GETapi-orders--order_id-"
               value="2"
               data-component="url">
    <br>
<p>The ID of the order. Example: <code>2</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-PATCHapi-orders--order_id--status">PATCH api/orders/{order_id}/status</h2>

<p>
</p>



<span id="example-requests-PATCHapi-orders--order_id--status">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PATCH \
    "http://127.0.0.1:8000/api/orders/2/status" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"status\": \"shipped\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/orders/2/status"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "status": "shipped"
};

fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PATCHapi-orders--order_id--status">
</span>
<span id="execution-results-PATCHapi-orders--order_id--status" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PATCHapi-orders--order_id--status"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PATCHapi-orders--order_id--status"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PATCHapi-orders--order_id--status" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PATCHapi-orders--order_id--status">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PATCHapi-orders--order_id--status" data-method="PATCH"
      data-path="api/orders/{order_id}/status"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PATCHapi-orders--order_id--status', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PATCHapi-orders--order_id--status"
                    onclick="tryItOut('PATCHapi-orders--order_id--status');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PATCHapi-orders--order_id--status"
                    onclick="cancelTryOut('PATCHapi-orders--order_id--status');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PATCHapi-orders--order_id--status"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-purple">PATCH</small>
            <b><code>api/orders/{order_id}/status</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PATCHapi-orders--order_id--status"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PATCHapi-orders--order_id--status"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>order_id</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="order_id"                data-endpoint="PATCHapi-orders--order_id--status"
               value="2"
               data-component="url">
    <br>
<p>The ID of the order. Example: <code>2</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>status</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="status"                data-endpoint="PATCHapi-orders--order_id--status"
               value="shipped"
               data-component="body">
    <br>
<p>Example: <code>shipped</code></p>
Must be one of:
<ul style="list-style-type: square;"><li><code>pending</code></li> <li><code>confirmed</code></li> <li><code>processing</code></li> <li><code>shipped</code></li> <li><code>delivered</code></li> <li><code>cancelled</code></li></ul>
        </div>
        </form>

                    <h2 id="endpoints-POSTapi-orders-delivery">POST api/orders/delivery</h2>

<p>
</p>



<span id="example-requests-POSTapi-orders-delivery">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/orders/delivery" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"items\": [
        {
            \"title\": \"architecto\",
            \"quantity\": 22,
            \"unitPrice\": 84
        }
    ],
    \"client_name\": \"b\",
    \"client_phone\": \"n\",
    \"shipping_address\": \"g\",
    \"commune\": \"z\",
    \"delivery_fee\": 77
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/orders/delivery"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "items": [
        {
            "title": "architecto",
            "quantity": 22,
            "unitPrice": 84
        }
    ],
    "client_name": "b",
    "client_phone": "n",
    "shipping_address": "g",
    "commune": "z",
    "delivery_fee": 77
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-orders-delivery">
</span>
<span id="execution-results-POSTapi-orders-delivery" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-orders-delivery"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-orders-delivery"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-orders-delivery" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-orders-delivery">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-orders-delivery" data-method="POST"
      data-path="api/orders/delivery"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-orders-delivery', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-orders-delivery"
                    onclick="tryItOut('POSTapi-orders-delivery');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-orders-delivery"
                    onclick="cancelTryOut('POSTapi-orders-delivery');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-orders-delivery"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/orders/delivery</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-orders-delivery"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-orders-delivery"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
        <details>
            <summary style="padding-bottom: 10px;">
                <b style="line-height: 2;"><code>items</code></b>&nbsp;&nbsp;
<small>object[]</small>&nbsp;
 &nbsp;
 &nbsp;
<br>
<p>Must have at least 1 items.</p>
            </summary>
                                                <div style="margin-left: 14px; clear: unset;">
                        <b style="line-height: 2;"><code>title</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="items.0.title"                data-endpoint="POSTapi-orders-delivery"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
                    </div>
                                                                <div style="margin-left: 14px; clear: unset;">
                        <b style="line-height: 2;"><code>quantity</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="items.0.quantity"                data-endpoint="POSTapi-orders-delivery"
               value="22"
               data-component="body">
    <br>
<p>Must be at least 1. Example: <code>22</code></p>
                    </div>
                                                                <div style="margin-left: 14px; clear: unset;">
                        <b style="line-height: 2;"><code>unitPrice</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="items.0.unitPrice"                data-endpoint="POSTapi-orders-delivery"
               value="84"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>84</code></p>
                    </div>
                                    </details>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>client_name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="client_name"                data-endpoint="POSTapi-orders-delivery"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>client_phone</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="client_phone"                data-endpoint="POSTapi-orders-delivery"
               value="n"
               data-component="body">
    <br>
<p>Must not be greater than 30 characters. Example: <code>n</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>shipping_address</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="shipping_address"                data-endpoint="POSTapi-orders-delivery"
               value="g"
               data-component="body">
    <br>
<p>Must not be greater than 500 characters. Example: <code>g</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>commune</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="commune"                data-endpoint="POSTapi-orders-delivery"
               value="z"
               data-component="body">
    <br>
<p>Must not be greater than 100 characters. Example: <code>z</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>delivery_fee</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="delivery_fee"                data-endpoint="POSTapi-orders-delivery"
               value="77"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>77</code></p>
        </div>
        </form>

                    <h2 id="endpoints-POSTapi-products">POST api/products</h2>

<p>
</p>



<span id="example-requests-POSTapi-products">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://127.0.0.1:8000/api/products" \
    --header "Content-Type: multipart/form-data" \
    --header "Accept: application/json" \
    --form "category_id=architecto"\
    --form "name=n"\
    --form "description=Eius et animi quos velit et."\
    --form "price=60"\
    --form "cost=42"\
    --form "quantity=37"\
    --form "min_quantity=9"\
    --form "sku=n"\
    --form "badge=i"\
    --form "is_active="\
    --form "image=@C:\Users\desia\AppData\Local\Temp\php1827.tmp" \
    --form "image2=@C:\Users\desia\AppData\Local\Temp\php1828.tmp" </code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/products"
);

const headers = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
};

const body = new FormData();
body.append('category_id', 'architecto');
body.append('name', 'n');
body.append('description', 'Eius et animi quos velit et.');
body.append('price', '60');
body.append('cost', '42');
body.append('quantity', '37');
body.append('min_quantity', '9');
body.append('sku', 'n');
body.append('badge', 'i');
body.append('is_active', '');
body.append('image', document.querySelector('input[name="image"]').files[0]);
body.append('image2', document.querySelector('input[name="image2"]').files[0]);

fetch(url, {
    method: "POST",
    headers,
    body,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-products">
</span>
<span id="execution-results-POSTapi-products" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-products"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-products"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-products" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-products">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-products" data-method="POST"
      data-path="api/products"
      data-authed="0"
      data-hasfiles="1"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-products', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-products"
                    onclick="tryItOut('POSTapi-products');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-products"
                    onclick="cancelTryOut('POSTapi-products');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-products"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/products</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-products"
               value="multipart/form-data"
               data-component="header">
    <br>
<p>Example: <code>multipart/form-data</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-products"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>category_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="category_id"                data-endpoint="POSTapi-products"
               value="architecto"
               data-component="body">
    <br>
<p>Must match an existing stored value. Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="POSTapi-products"
               value="n"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>n</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>description</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="description"                data-endpoint="POSTapi-products"
               value="Eius et animi quos velit et."
               data-component="body">
    <br>
<p>Example: <code>Eius et animi quos velit et.</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>price</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="price"                data-endpoint="POSTapi-products"
               value="60"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>60</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>cost</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="cost"                data-endpoint="POSTapi-products"
               value="42"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>42</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>quantity</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="quantity"                data-endpoint="POSTapi-products"
               value="37"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>37</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>min_quantity</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="min_quantity"                data-endpoint="POSTapi-products"
               value="9"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>9</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>sku</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="sku"                data-endpoint="POSTapi-products"
               value="n"
               data-component="body">
    <br>
<p>Must not be greater than 100 characters. Example: <code>n</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>badge</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="badge"                data-endpoint="POSTapi-products"
               value="i"
               data-component="body">
    <br>
<p>Must not be greater than 50 characters. Example: <code>i</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>is_active</code></b>&nbsp;&nbsp;
<small>boolean</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <label data-endpoint="POSTapi-products" style="display: none">
            <input type="radio" name="is_active"
                   value="true"
                   data-endpoint="POSTapi-products"
                   data-component="body"             >
            <code>true</code>
        </label>
        <label data-endpoint="POSTapi-products" style="display: none">
            <input type="radio" name="is_active"
                   value="false"
                   data-endpoint="POSTapi-products"
                   data-component="body"             >
            <code>false</code>
        </label>
    <br>
<p>Example: <code>false</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>image</code></b>&nbsp;&nbsp;
<small>file</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="file" style="display: none"
                              name="image"                data-endpoint="POSTapi-products"
               value=""
               data-component="body">
    <br>
<p>Must be an image. Must not be greater than 4096 kilobytes. Example: <code>C:\Users\desia\AppData\Local\Temp\php1827.tmp</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>image2</code></b>&nbsp;&nbsp;
<small>file</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="file" style="display: none"
                              name="image2"                data-endpoint="POSTapi-products"
               value=""
               data-component="body">
    <br>
<p>Must be an image. Must not be greater than 4096 kilobytes. Example: <code>C:\Users\desia\AppData\Local\Temp\php1828.tmp</code></p>
        </div>
        </form>

                    <h2 id="endpoints-PUTapi-products--product_id-">PUT api/products/{product_id}</h2>

<p>
</p>



<span id="example-requests-PUTapi-products--product_id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://127.0.0.1:8000/api/products/3" \
    --header "Content-Type: multipart/form-data" \
    --header "Accept: application/json" \
    --form "name=b"\
    --form "description=Eius et animi quos velit et."\
    --form "price=60"\
    --form "cost=42"\
    --form "quantity=37"\
    --form "min_quantity=9"\
    --form "sku=n"\
    --form "badge=i"\
    --form "is_active="\
    --form "image=@C:\Users\desia\AppData\Local\Temp\php1838.tmp" \
    --form "image2=@C:\Users\desia\AppData\Local\Temp\php1839.tmp" </code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/products/3"
);

const headers = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
};

const body = new FormData();
body.append('name', 'b');
body.append('description', 'Eius et animi quos velit et.');
body.append('price', '60');
body.append('cost', '42');
body.append('quantity', '37');
body.append('min_quantity', '9');
body.append('sku', 'n');
body.append('badge', 'i');
body.append('is_active', '');
body.append('image', document.querySelector('input[name="image"]').files[0]);
body.append('image2', document.querySelector('input[name="image2"]').files[0]);

fetch(url, {
    method: "PUT",
    headers,
    body,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTapi-products--product_id-">
</span>
<span id="execution-results-PUTapi-products--product_id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTapi-products--product_id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTapi-products--product_id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTapi-products--product_id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTapi-products--product_id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTapi-products--product_id-" data-method="PUT"
      data-path="api/products/{product_id}"
      data-authed="0"
      data-hasfiles="1"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTapi-products--product_id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTapi-products--product_id-"
                    onclick="tryItOut('PUTapi-products--product_id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTapi-products--product_id-"
                    onclick="cancelTryOut('PUTapi-products--product_id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTapi-products--product_id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>api/products/{product_id}</code></b>
        </p>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/products/{product_id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTapi-products--product_id-"
               value="multipart/form-data"
               data-component="header">
    <br>
<p>Example: <code>multipart/form-data</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTapi-products--product_id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>product_id</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="product_id"                data-endpoint="PUTapi-products--product_id-"
               value="3"
               data-component="url">
    <br>
<p>The ID of the product. Example: <code>3</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>category_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="category_id"                data-endpoint="PUTapi-products--product_id-"
               value=""
               data-component="body">
    <br>
<p>Must match an existing stored value.</p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="PUTapi-products--product_id-"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>description</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="description"                data-endpoint="PUTapi-products--product_id-"
               value="Eius et animi quos velit et."
               data-component="body">
    <br>
<p>Example: <code>Eius et animi quos velit et.</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>price</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="price"                data-endpoint="PUTapi-products--product_id-"
               value="60"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>60</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>cost</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="cost"                data-endpoint="PUTapi-products--product_id-"
               value="42"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>42</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>quantity</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="quantity"                data-endpoint="PUTapi-products--product_id-"
               value="37"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>37</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>min_quantity</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="min_quantity"                data-endpoint="PUTapi-products--product_id-"
               value="9"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>9</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>sku</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="sku"                data-endpoint="PUTapi-products--product_id-"
               value="n"
               data-component="body">
    <br>
<p>Must not be greater than 100 characters. Example: <code>n</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>badge</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="badge"                data-endpoint="PUTapi-products--product_id-"
               value="i"
               data-component="body">
    <br>
<p>Must not be greater than 50 characters. Example: <code>i</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>is_active</code></b>&nbsp;&nbsp;
<small>boolean</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <label data-endpoint="PUTapi-products--product_id-" style="display: none">
            <input type="radio" name="is_active"
                   value="true"
                   data-endpoint="PUTapi-products--product_id-"
                   data-component="body"             >
            <code>true</code>
        </label>
        <label data-endpoint="PUTapi-products--product_id-" style="display: none">
            <input type="radio" name="is_active"
                   value="false"
                   data-endpoint="PUTapi-products--product_id-"
                   data-component="body"             >
            <code>false</code>
        </label>
    <br>
<p>Example: <code>false</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>image</code></b>&nbsp;&nbsp;
<small>file</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="file" style="display: none"
                              name="image"                data-endpoint="PUTapi-products--product_id-"
               value=""
               data-component="body">
    <br>
<p>Must be an image. Must not be greater than 4096 kilobytes. Example: <code>C:\Users\desia\AppData\Local\Temp\php1838.tmp</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>image2</code></b>&nbsp;&nbsp;
<small>file</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="file" style="display: none"
                              name="image2"                data-endpoint="PUTapi-products--product_id-"
               value=""
               data-component="body">
    <br>
<p>Must be an image. Must not be greater than 4096 kilobytes. Example: <code>C:\Users\desia\AppData\Local\Temp\php1839.tmp</code></p>
        </div>
        </form>

                    <h2 id="endpoints-DELETEapi-products--product_id-">DELETE api/products/{product_id}</h2>

<p>
</p>



<span id="example-requests-DELETEapi-products--product_id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://127.0.0.1:8000/api/products/3" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://127.0.0.1:8000/api/products/3"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEapi-products--product_id-">
</span>
<span id="execution-results-DELETEapi-products--product_id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEapi-products--product_id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEapi-products--product_id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEapi-products--product_id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEapi-products--product_id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEapi-products--product_id-" data-method="DELETE"
      data-path="api/products/{product_id}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEapi-products--product_id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEapi-products--product_id-"
                    onclick="tryItOut('DELETEapi-products--product_id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEapi-products--product_id-"
                    onclick="cancelTryOut('DELETEapi-products--product_id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEapi-products--product_id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>api/products/{product_id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEapi-products--product_id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEapi-products--product_id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>product_id</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="product_id"                data-endpoint="DELETEapi-products--product_id-"
               value="3"
               data-component="url">
    <br>
<p>The ID of the product. Example: <code>3</code></p>
            </div>
                    </form>

            

        
    </div>
    <div class="dark-box">
                    <div class="lang-selector">
                                                        <button type="button" class="lang-button" data-language-name="bash">bash</button>
                                                        <button type="button" class="lang-button" data-language-name="javascript">javascript</button>
                            </div>
            </div>
</div>
</body>
</html>
