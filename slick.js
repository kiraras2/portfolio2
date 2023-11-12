window.performance && window.performance.mark && window.performance.mark('shopify.content_for_header.end');

const current_url = new URL(window.location.href);
const current_params = current_url.searchParams;
var stored_selectable_code = sessionStorage.getItem("code");
const get_value_selectable_code = current_params.get('code');
// const selectable_code = current_params.get('selectable_code');
var stored_refil_code = sessionStorage.getItem("refil_code");
const get_value_refil_code = current_params.get('refil_code');
var discount_code = "";
var refil_code = "";
var selectable_code = "";
if(get_value_refil_code) {
  sessionStorage.setItem("refil_code", get_value_refil_code);
  refil_code = get_value_refil_code;
  discount_code = refil_code;
}else if(stored_refil_code){
  sessionStorage.setItem("refil_code", stored_refil_code);
  refil_code = stored_refil_code;
  discount_code = refil_code;
}else if(get_value_selectable_code) {
  sessionStorage.setItem("selectable_code", get_value_selectable_code);
  selectable_code = get_value_selectable_code;
  discount_code = selectable_code;
}else if(stored_selectable_code){
  sessionStorage.setItem("selectable_code", stored_selectable_code);
  selectable_code = stored_selectable_code;
  discount_code = selectable_code;
}

(function(){if ("sendBeacon" in navigator && "performance" in window) {var session_token = document.cookie.match(/_shopify_s=([^;]*)/);function handle_abandonment_event(e) {var entries = performance.getEntries().filter(function(entry) {return /monorail-edge.shopifysvc.com/.test(entry.name);});if (!window.abandonment_tracked && entries.length === 0) {window.abandonment_tracked = true;var currentMs = Date.now();var navigation_start = performance.timing.navigationStart;var payload = {shop_id: 51082035390,url: window.location.href,navigation_start,duration: currentMs - navigation_start,session_token: session_token && session_token.length === 2 ? session_token[1] : "",page_type: "index"};window.navigator.sendBeacon("https://monorail-edge.shopifysvc.com/v1/produce", JSON.stringify({schema_id: "online_store_buyer_site_abandonment/1.1",payload: payload,metadata: {event_created_at_ms: currentMs,event_sent_at_ms: currentMs}}));}}window.addEventListener('pagehide', handle_abandonment_event);}}());
