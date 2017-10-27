interface Plugin {
  new (): Plugin;
}

module.exports = (Plugin: Plugin, Api, Vendor) => {
  const { React } = Vendor;
  return class Quoter extends Plugin {
    constructor() {
      super();
    }

    onStart() {
      console.log('onStart');
      return true;
    }

    onStop() {
      console.log('onStop');
      return true;
    }

    get settingsPanel() {
      return (
        <div>
          <h3>Example plugin</h3>
        </div>
      );
    }
  };
};
