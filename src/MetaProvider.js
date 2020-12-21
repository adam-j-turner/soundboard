class MetaProvider {
  constructor() {
    this.data = {}
    this.files = this.importBulk(require.context('./sounds', true, /meta.json/))
  }

  getList(name) {
    var list = []
  
    for (const [key, value] of Object.entries(this.data)) {
      if (value.lists.includes(name)) {
        list.push(key.replace('./sounds/', ''))
      }
    }

    return list
  }

  importBulk(context) {
    context.keys().map((item) => {
      // For some reason, making a var and using it in 'require()' below doesn't work????????
      var json = require("./sounds/" + item.replace('./', ''))
      var path = "./sounds/" + item.replace('./', '').replace('meta.json', '')

      for (const [key, value] of Object.entries(json)) {
        json[path + key] = value
        delete json[key]
      }

      this.data = Object.assign({}, this.data, json);
    })
  }
}

const meta = new MetaProvider();

export default meta;
