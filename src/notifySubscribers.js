export default function notifySubscribers(subscribers, nextState) {
  for (let i = 0; i < subscribers.length; i += 1) {
    const currentSub = subscribers[i];

    currentSub(nextState);
  }
}
