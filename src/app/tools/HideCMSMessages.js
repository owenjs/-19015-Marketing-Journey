export function hideCMSMessages() {
  // Hide Messages on the Site, don't need them tbh
  var aMessagePriorties = document.querySelectorAll('.MsgPriority');
  aMessagePriorties = Array.prototype.slice.call(aMessagePriorties);

  // Hide the old messages
  if (aMessagePriorties.length) {

    // Hide Messages if we can
    if (aMessagePriorties[0].parentNode != null) {
      aMessagePriorties[0].parentNode.parentNode.parentNode.style.display = "none";
    }
  }
};