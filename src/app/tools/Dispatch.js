class Dispatchx {

  constructor() {
    this.dispatchGroups = {
      groups: new Array(),
    };
  }

  addToDispatchGroup(group, fnDispatch) {
    if (this.dispatchGroups.groups.indexOf(group) == -1) {
      // If we don't already have this group as a dispatch group
      this.addDispatchGroup(group);
    }
    // Add the Function Given to the Dispatch Group
    this.dispatchGroups[group].push(fnDispatch);
  }

  addDispatchGroup(group) {
    this.dispatchGroups.groups.push(group);
    this.dispatchGroups[group] = [];
  }

  dispatch(group, dispatchInfo) {
    if (this.dispatchGroups.groups.indexOf(group) == -1) {
      return;
    }
    this.dispatchGroups[group].forEach((fnDispatch) => {
      fnDispatch(dispatchInfo);
    });
  }

}
if (!window.Dispatch) {
  window.Dispatch = new Dispatchx()
}
// Watch out it's a Singleton!
export default window.Dispatch;