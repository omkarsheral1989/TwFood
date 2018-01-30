export default function sendGAEvent(eventCatagory, eventAction = null) {
  console.log('GA event', eventCatagory, eventAction);
  window.ga('send', 'event', {
    'eventCategory': eventCatagory,
    'eventAction': eventAction
  });
}
