const pallet = {
  color1: '#1B49A1', //main1 blue
  color2: '#69D0E7', //main2 blue
  color3: '#020C20', //main3 darkBlue
  color4: "#FFF", //balance4 white
  color5: "#333", //balance5 text
  color6: "#790707", //balance6 red
  color7: "#FC8A8A", //variation7 red
  color8: "#634B0D", //variation8 yellow
  color9: "#FFC66F", //variation9 yellow
  color10: "#FFBD59", //accent10 yellow
}

const gradient = {
  prime: {
    from: pallet.color1,
    to: pallet.color2,
  },
  dangerous: {
    from: pallet.color6,
    to: pallet.color7,
  },
  warning: {
    from: pallet.color8,
    to: pallet.color9,
  }
}

const light = {
  lightBg: pallet.color4,
  lightText: pallet.color5,
  lightPrime: pallet.color1,
  lightDangerous: pallet.color6,
  lightWaring: pallet.color8,
}

const dark = {
  darkBg: pallet.color3,
  darkText: pallet.color4,
  darkPrime: pallet.color2,
  darkDangerous: pallet.color7,
  darkWaring: pallet.color9,
}

const colors = {
  ...light,
  ...dark,
  ...gradient,
}

module.exports = { colors }
