const data = {
  people: ['premiér', 'babiš', 'ministr zdravotnictví', 'ministr vnitra', 'ministr školství', 'hamáček', 'plaga'],
  peoplePhrases: [
    'otevření škol ve stupni $level systému pes si nedovedu představit',
    'registrace lidí pod 80 let se odsouvá',
    'očkovat by se nechalo 58 % dotazovaných',
    'pro zvládnutí epidemie musíme na 2 až 3 týdny udělat tvrdý lockdown, neuvažovat o otevření škola uzavřít továrny',
    'kvůli britské mutaci koronaviru budou muset být zpřísněna opatření',
    'diskutujeme o zavedení povinného nošení respirátorů v obchodech a veřejné dopravě',
    'o rozvolnění opatření budeme moci uvažovat, až bude hospitalizováno jen 3 tisíce lidí s kovidem',
    'o rozvolnění opatření budeme moci uvažovat, až bude hospitalizováno jen 2 tisíce lidí s kovidem',
    've stupni $level systému pes ještě nějakou dobu zůstaneme',
    'plošné nošení roušek může skončit v létě',
    'plošné nošení roušek může skončit na jaře',
    'plošné nošení roušek může skončit na podzim',
    'plošné nošení roušek může skončit v zimě',
    'o zmírnění opatření bude vláda jednat pravděpodobně v pondělí',
    'o zmírnění opatření bude vláda jednat pravděpodobně v úterý',
    'o zmírnění opatření bude vláda jednat pravděpodobně ve středu',
    'o zmírnění opatření bude vláda jednat pravděpodobně ve čtvrtek',
    'o zmírnění opatření bude vláda jednat pravděpodobně v pátek',
    'vláda v pondělí požádá sněmovnu o prodloužení nouzového stavu o $days dní',
    'vláda v úterý požádá sněmovnu o prodloužení nouzového stavu o $days dní',
    'vláda ve středu požádá sněmovnu o prodloužení nouzového stavu o $days dní',
    'vláda ve čtvrtek požádá sněmovnu o prodloužení nouzového stavu o $days dní',
    'vláda v pátek požádá sněmovnu o prodloužení nouzového stavu o $days dní',
    'zmírnění opatření se nedá v příštím týdnu očekávat',
    's řadou poměrně tvrdých opatření jde počítat přibližně do $date',
  ],
  phrases: [
    'Německo zařadilo českou republiku na seznam rizikových oblastí',
    'k rozvolnění dojde nejdříve za týden',
    'k rozvolnění dojde nejdříve za dva týdny',
    'k rozvolnění dojde nejdříve za tři týdny',
    'návrh nové tabulky pes umožňuje návrat závěrečných ročníků do škol',
    'v české republice byl potvrzen výskyt nakažlivější britské mutace',
    'od úterý budou moci otevřít papírnictví, obchody s dětským oblečením a obuví. Obchody se spodním prádlem nebudou moci otevřít',
    'je reálná šance, že se maturanti do škol vrátí až $date',
    'laboratoř má podezření na výskyt nakažlivější britské mutace',
    'babiš doporučil zrušit u maturity didaktické testy',
    'babiš doporučil zrušit u maturity ústní zkoušky',
    'babiš doporučil zrušit u maturity slohy',
    'babiš doporučil zrušit maturity',
    'plaga doporučil zrušit u maturity didaktické testy',
    'plaga doporučil zrušit u maturity ústní zkoušky',
    'plaga doporučil zrušit u maturity slohy',
    'plaga doporučil zrušit maturity',
    'hamáček doporučil zrušit u maturity didaktické testy',
    'hamáček doporučil zrušit u maturity ústní zkoušky',
    'hamáček doporučil zrušit u maturity slohy',
    'hamáček doporučil zrušit maturity',
  ],
};

const testRandomGenerator = (generator, min, max) => {
  let set = new Set();
  for (let i = 0; i < 10000; i++) {
    set.add(generator(min, max));
  }
  console.log([...set].sort((a, b) => a - b));
};

const randomNumber = (max = 1, min = 0) => Math.floor(Math.random() * (max - 1 - min)) + min + 1;

const randomEvent = () => {
  let dom_element = document.querySelector('#text');
  let res;
  switch (randomNumber(0, 1)) {
    case 0:
      res = data.people[randomNumber(0, data.people.length - 1)] + ': ' + data.peoplePhrases[randomNumber(0, data.peoplePhrases.length - 1)];
      break;
    case 1:
      res = data.phrases[randomNumber(0, data.phrases.length - 1)];
      break;
  }

  let d = new Date();
  console.log(res);
  res = /\$date/gi.test(res)
    ? res.replace(/\$date/gi, `${((d.getDate() + randomNumber(0, 30)) % 28) + 1}. ${((d.getMonth() + 1 + randomNumber(0, 12)) % 12) + 1}. ${d.getFullYear() + randomNumber(1, 5)}`)
    : res;
  console.log(res);
  res = /\$days/gi.test(res) ? res.replace(/\$days/gi, `${randomNumber(1, 9)}0`) : res;
  console.log(res);
  res = /\$level/gi.test(res) ? res.replace(/\$level/gi, `${randomNumber(1, 5)}`) : res;
  console.log(res);
  dom_element.textContent = res;

  const button_download = document.querySelector('#download');
  const node = document.querySelector('#content');
  domtoimage.toPng(node).then(function (dataUrl) {
    button_download.href = dataUrl;
  });
};

document.addEventListener('DOMContentLoaded', () => {
  randomEvent();

  const button_download = document.querySelector('#download');
  const button_reload = document.querySelector('#reload');

  button_download.addEventListener('click', (e) => {
    //e.preventDefault();
  });
  button_reload.addEventListener('click', (e) => {
    e.preventDefault();
    randomEvent();
  });
});
