const pollingItem = (method: () => void, interval: number | undefined) => {
  let poll: string | number | NodeJS.Timer | undefined;

  function startPolling() {
    poll = setInterval(method, interval);
  }

  function clearPolling() {
    clearInterval(poll);
  }

  return { startPolling, clearPolling };
};

const PollingService = () => {
  let pollingIdList: { startPolling: () => void; clearPolling: () => void }[] = [];

  function addPolling(method: () => void, interval: number | undefined) {
    pollingIdList.push(pollingItem(method, interval));
  }

  function clearAllPolling() {
    pollingIdList.forEach((poll) => {
      poll.clearPolling();
    });
    pollingIdList = [];
  }

  function startAllPolling() {
    pollingIdList.forEach((poll) => {
      poll.startPolling();
    });
  }

  return { addPolling, clearAllPolling, startAllPolling };
};

export default PollingService;
