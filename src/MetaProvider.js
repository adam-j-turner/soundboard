class MetaProvider {
  constructor() {
    this.data = {}
    this.files = this.importBulk(require.context('./sounds', true, /meta.json/))
  }

  getList(name, full=false) {
    var list = []
  
    for (const [key, value] of Object.entries(this.data)) {
      if (value.lists.includes(name)) {
        if (full) {
          list.push({
            audioPath: key.replace('./sounds/', ''),
            description: value.description,
            text: value.displayText
          })
        } else {
          list.push(key.replace('./sounds/', ''))
        }
      }
    }

    return full ? list.sort(this.sortAlpha) : list.sort()
  }

  sortAlpha(a, b) {
    var textA = a.text.toUpperCase();
    var textB = b.text.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
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
