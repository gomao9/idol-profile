Vue.use(Buefy.default)

class Idol {
  constructor(hash) {
    var pairs = Object.entries(hash);
    for (var index in pairs) {
      var [key, value] = pairs[index];
      if (key == 'NaN') {
        continue;
      };

      this[key.slice(1)] = value;
    };
  }
}

var app = new Vue({
  el: '#app',
  data: {
    keyword: '',
    original_songs: undefined,
    idols: undefined,
    enabled_search_items: ["song_name", "idol_unit", "cd", "cd_short"],
    enable_hashtag: false
  },
  mounted: function () {
    this.idols = this.get_songs();
  },
  methods: {
    get_songs: function (cds, units) {
      var idols = YAML.load('https://bitbucket.org/gomao9/idol-profile/raw/master/profile.yml')
      return Object.values(idols).map(function(idol) {
        return new Idol(idol);
      });
    }
  }
});
