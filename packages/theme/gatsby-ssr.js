const React = require("react")

exports.onRenderBody = ({ setHeadComponents }, options) => {
  const scriptsArray = []

  scriptsArray.push(
    <script key={`shopify-client-sdk`} src="http://sdks.shopifycdn.com/js-buy-sdk/v2/latest/index.umd.min.js"></script>,
    <script
      key={`shopify-client-init-script`}
      dangerouslySetInnerHTML={{
        __html: `
          window.storeClient = ShopifyBuy.buildClient({
            domain: '${options.shopName}',
            storefrontAccessToken: '${options.accessToken}'
          });
        `
      }}
    />
  )

  if (process.env.NODE_ENV === `production` && options.pixelId && options.appId) {
    scriptsArray.push(
      <script
        key={`facebook-pixel-app-script`}
        dangerouslySetInnerHTML={{
          __html: `
            window.onload = function(){

              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.setAttribute("defer", "defer");
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${options.pixelId}'); // Insert your pixel ID here.
              fbq('track', 'PageView');

              window.fbAsyncInit = function() {
                FB.init({
                  appId      : '${options.appId}',
                  cookie     : true,
                  xfbml      : true,
                  version    : 'v6.0'
                });
  
                FB.AppEvents.logPageView();
              };
  
              (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                js.setAttribute("defer", "defer");
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
            }
          `
        }}
      />
    );
  }

  return setHeadComponents(scriptsArray);
}