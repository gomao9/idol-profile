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

    this.weightInt   = parseInt(this.weight, 10);
    this.heightInt   = parseInt(this.height, 10);
    this.ageInt      = parseInt(this.age, 10);
    this.shoeSizeInt = parseInt(this.shoeSize, 10);
    this.bmi = this.weightInt / ((this.heightInt /100.0) ** 2);

  }

  bmiStr() { return isNaN(this.bmi) ? '' : this.bmi.toFixed(2) }

  heightStr() {
    if (!this.height) {
      return '';
    }
    return isNaN(this.heightInt) ? this.height : `${this.heightInt}cm`;
  }

  weightStr() {
    if (!this.weight) {
      return '';
    }
    return isNaN(this.weightInt) ? this.weight : `${this.weightInt}kg`;
  }

  ageStr() { return this.age ? `${this.age}歳` : ''; }

   shoeSizeStr() { return isNaN(this.shoeSizeInt) ? '' : `${this.shoeSizeInt}kg` }

  handednessStr() {
    switch (this.handedness) {
      case 'right':
        return '右手';
      case 'left':
        return '左手';
      case 'both':
        return '両手';
      default:
        return '';
    }
  }

  threeSize() {
    if (!this.bust) {
      return '';
    }
    return `${this.bust}-${this.waist}-${this.hip}`
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
