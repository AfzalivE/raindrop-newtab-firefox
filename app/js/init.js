! function e(t, n, i) {
  function s(r, o) {
    if (!n[r]) {
      if (!t[r]) {
        var d = "function" == typeof require && require;
        if (!o && d) return d(r, !0);
        if (a) return a(r, !0);
        var u = new Error("Cannot find module '" + r + "'");
        throw u.code = "MODULE_NOT_FOUND", u
      }
      var l = n[r] = {
        exports: {}
      };
      t[r][0].call(l.exports, function (e) {
        var n = t[r][1][e];
        return s(n ? n : e)
      }, l, l.exports, e, t, n, i)
    }
    return n[r].exports
  }
  for (var a = "function" == typeof require && require, r = 0; r < i.length; r++) s(i[r]);
  return s
}({
  1: [function (e, t, n) {
    ! function (i, s) {
      "object" == typeof n && "undefined" != typeof t && "function" == typeof e ? s(e("../moment")) : "function" == typeof define && define.amd ? define(["moment"], s) : s(i.moment)
    }(this, function (e) {
      "use strict";

      function t(e, t, n, i) {
        var s = {
          m: ["eine Minute", "einer Minute"],
          h: ["eine Stunde", "einer Stunde"],
          d: ["ein Tag", "einem Tag"],
          dd: [e + " Tage", e + " Tagen"],
          M: ["ein Monat", "einem Monat"],
          MM: [e + " Monate", e + " Monaten"],
          y: ["ein Jahr", "einem Jahr"],
          yy: [e + " Jahre", e + " Jahren"]
        };
        return t ? s[n][0] : s[n][1]
      }
      var n = e.defineLocale("de", {
        months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort: "Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
        weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
        weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
        longDateFormat: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D. MMMM YYYY",
          LLL: "D. MMMM YYYY HH:mm",
          LLLL: "dddd, D. MMMM YYYY HH:mm"
        },
        calendar: {
          sameDay: "[heute um] LT [Uhr]",
          sameElse: "L",
          nextDay: "[morgen um] LT [Uhr]",
          nextWeek: "dddd [um] LT [Uhr]",
          lastDay: "[gestern um] LT [Uhr]",
          lastWeek: "[letzten] dddd [um] LT [Uhr]"
        },
        relativeTime: {
          future: "in %s",
          past: "vor %s",
          s: "ein paar Sekunden",
          m: t,
          mm: "%d Minuten",
          h: t,
          hh: "%d Stunden",
          d: t,
          dd: t,
          M: t,
          MM: t,
          y: t,
          yy: t
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
          dow: 1,
          doy: 4
        }
      });
      return n
    })
  }, {
    "../moment": 15
  }],
  2: [function (e, t, n) {
    ! function (i, s) {
      "object" == typeof n && "undefined" != typeof t && "function" == typeof e ? s(e("../moment")) : "function" == typeof define && define.amd ? define(["moment"], s) : s(i.moment)
    }(this, function (e) {
      "use strict";
      var t = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
        n = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
        i = e.defineLocale("es", {
          months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
          monthsShort: function (e, i) {
            return /-MMM-/.test(i) ? n[e.month()] : t[e.month()]
          },
          weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
          weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
          weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
          longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY H:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
          },
          calendar: {
            sameDay: function () {
              return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            nextDay: function () {
              return "[mañana a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            nextWeek: function () {
              return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            lastDay: function () {
              return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            lastWeek: function () {
              return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            sameElse: "L"
          },
          relativeTime: {
            future: "en %s",
            past: "hace %s",
            s: "unos segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "una hora",
            hh: "%d horas",
            d: "un día",
            dd: "%d días",
            M: "un mes",
            MM: "%d meses",
            y: "un año",
            yy: "%d años"
          },
          ordinalParse: /\d{1,2}º/,
          ordinal: "%dº",
          week: {
            dow: 1,
            doy: 4
          }
        });
      return i
    })
  }, {
    "../moment": 15
  }],
  3: [function (e, t, n) {
    ! function (i, s) {
      "object" == typeof n && "undefined" != typeof t && "function" == typeof e ? s(e("../moment")) : "function" == typeof define && define.amd ? define(["moment"], s) : s(i.moment)
    }(this, function (e) {
      "use strict";

      function t(e, t, i, s) {
        var a = "";
        switch (i) {
          case "s":
            return s ? "muutaman sekunnin" : "muutama sekunti";
          case "m":
            return s ? "minuutin" : "minuutti";
          case "mm":
            a = s ? "minuutin" : "minuuttia";
            break;
          case "h":
            return s ? "tunnin" : "tunti";
          case "hh":
            a = s ? "tunnin" : "tuntia";
            break;
          case "d":
            return s ? "päivän" : "päivä";
          case "dd":
            a = s ? "päivän" : "päivää";
            break;
          case "M":
            return s ? "kuukauden" : "kuukausi";
          case "MM":
            a = s ? "kuukauden" : "kuukautta";
            break;
          case "y":
            return s ? "vuoden" : "vuosi";
          case "yy":
            a = s ? "vuoden" : "vuotta"
        }
        return a = n(e, s) + " " + a
      }

      function n(e, t) {
        return 10 > e ? t ? s[e] : i[e] : e
      }
      var i = "nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" "),
        s = ["nolla", "yhden", "kahden", "kolmen", "neljän", "viiden", "kuuden", i[7], i[8], i[9]],
        a = e.defineLocale("fi", {
          months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
          monthsShort: "tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),
          weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
          weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
          weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
          longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD.MM.YYYY",
            LL: "Do MMMM[ta] YYYY",
            LLL: "Do MMMM[ta] YYYY, [klo] HH.mm",
            LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm",
            l: "D.M.YYYY",
            ll: "Do MMM YYYY",
            lll: "Do MMM YYYY, [klo] HH.mm",
            llll: "ddd, Do MMM YYYY, [klo] HH.mm"
          },
          calendar: {
            sameDay: "[tänään] [klo] LT",
            nextDay: "[huomenna] [klo] LT",
            nextWeek: "dddd [klo] LT",
            lastDay: "[eilen] [klo] LT",
            lastWeek: "[viime] dddd[na] [klo] LT",
            sameElse: "L"
          },
          relativeTime: {
            future: "%s päästä",
            past: "%s sitten",
            s: t,
            m: t,
            mm: t,
            h: t,
            hh: t,
            d: t,
            dd: t,
            M: t,
            MM: t,
            y: t,
            yy: t
          },
          ordinalParse: /\d{1,2}\./,
          ordinal: "%d.",
          week: {
            dow: 1,
            doy: 4
          }
        });
      return a
    })
  }, {
    "../moment": 15
  }],
  4: [function (e, t, n) {
    ! function (i, s) {
      "object" == typeof n && "undefined" != typeof t && "function" == typeof e ? s(e("../moment")) : "function" == typeof define && define.amd ? define(["moment"], s) : s(i.moment)
    }(this, function (e) {
      "use strict";
      var t = e.defineLocale("fr", {
        months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
        longDateFormat: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
          sameDay: "[Aujourd'hui à] LT",
          nextDay: "[Demain à] LT",
          nextWeek: "dddd [à] LT",
          lastDay: "[Hier à] LT",
          lastWeek: "dddd [dernier à] LT",
          sameElse: "L"
        },
        relativeTime: {
          future: "dans %s",
          past: "il y a %s",
          s: "quelques secondes",
          m: "une minute",
          mm: "%d minutes",
          h: "une heure",
          hh: "%d heures",
          d: "un jour",
          dd: "%d jours",
          M: "un mois",
          MM: "%d mois",
          y: "un an",
          yy: "%d ans"
        },
        ordinalParse: /\d{1,2}(er|)/,
        ordinal: function (e) {
          return e + (1 === e ? "er" : "")
        },
        week: {
          dow: 1,
          doy: 4
        }
      });
      return t
    })
  }, {
    "../moment": 15
  }],
  5: [function (e, t, n) {
    ! function (i, s) {
      "object" == typeof n && "undefined" != typeof t && "function" == typeof e ? s(e("../moment")) : "function" == typeof define && define.amd ? define(["moment"], s) : s(i.moment)
    }(this, function (e) {
      "use strict";
      var t = e.defineLocale("id", {
        months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),
        weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
        weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
        weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
        longDateFormat: {
          LT: "HH.mm",
          LTS: "HH.mm.ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY [pukul] HH.mm",
          LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        meridiemParse: /pagi|siang|sore|malam/,
        meridiemHour: function (e, t) {
          return 12 === e && (e = 0), "pagi" === t ? e : "siang" === t ? e >= 11 ? e : e + 12 : "sore" === t || "malam" === t ? e + 12 : void 0
        },
        meridiem: function (e, t, n) {
          return 11 > e ? "pagi" : 15 > e ? "siang" : 19 > e ? "sore" : "malam"
        },
        calendar: {
          sameDay: "[Hari ini pukul] LT",
          nextDay: "[Besok pukul] LT",
          nextWeek: "dddd [pukul] LT",
          lastDay: "[Kemarin pukul] LT",
          lastWeek: "dddd [lalu pukul] LT",
          sameElse: "L"
        },
        relativeTime: {
          future: "dalam %s",
          past: "%s yang lalu",
          s: "beberapa detik",
          m: "semenit",
          mm: "%d menit",
          h: "sejam",
          hh: "%d jam",
          d: "sehari",
          dd: "%d hari",
          M: "sebulan",
          MM: "%d bulan",
          y: "setahun",
          yy: "%d tahun"
        },
        week: {
          dow: 1,
          doy: 7
        }
      });
      return t
    })
  }, {
    "../moment": 15
  }],
  6: [function (e, t, n) {
    ! function (i, s) {
      "object" == typeof n && "undefined" != typeof t && "function" == typeof e ? s(e("../moment")) : "function" == typeof define && define.amd ? define(["moment"], s) : s(i.moment)
    }(this, function (e) {
      "use strict";
      var t = e.defineLocale("ko", {
        months: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
        monthsShort: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
        weekdays: "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),
        weekdaysShort: "일_월_화_수_목_금_토".split("_"),
        weekdaysMin: "일_월_화_수_목_금_토".split("_"),
        longDateFormat: {
          LT: "A h시 m분",
          LTS: "A h시 m분 s초",
          L: "YYYY.MM.DD",
          LL: "YYYY년 MMMM D일",
          LLL: "YYYY년 MMMM D일 A h시 m분",
          LLLL: "YYYY년 MMMM D일 dddd A h시 m분"
        },
        calendar: {
          sameDay: "오늘 LT",
          nextDay: "내일 LT",
          nextWeek: "dddd LT",
          lastDay: "어제 LT",
          lastWeek: "지난주 dddd LT",
          sameElse: "L"
        },
        relativeTime: {
          future: "%s 후",
          past: "%s 전",
          s: "몇초",
          ss: "%d초",
          m: "일분",
          mm: "%d분",
          h: "한시간",
          hh: "%d시간",
          d: "하루",
          dd: "%d일",
          M: "한달",
          MM: "%d달",
          y: "일년",
          yy: "%d년"
        },
        ordinalParse: /\d{1,2}일/,
        ordinal: "%d일",
        meridiemParse: /오전|오후/,
        isPM: function (e) {
          return "오후" === e
        },
        meridiem: function (e, t, n) {
          return 12 > e ? "오전" : "오후"
        }
      });
      return t
    })
  }, {
    "../moment": 15
  }],
  7: [function (e, t, n) {
    ! function (i, s) {
      "object" == typeof n && "undefined" != typeof t && "function" == typeof e ? s(e("../moment")) : "function" == typeof define && define.amd ? define(["moment"], s) : s(i.moment)
    }(this, function (e) {
      "use strict";
      var t = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
        n = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
        i = e.defineLocale("nl", {
          months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
          monthsShort: function (e, i) {
            return /-MMM-/.test(i) ? n[e.month()] : t[e.month()]
          },
          weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
          weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
          weekdaysMin: "Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),
          longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD-MM-YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
          },
          calendar: {
            sameDay: "[vandaag om] LT",
            nextDay: "[morgen om] LT",
            nextWeek: "dddd [om] LT",
            lastDay: "[gisteren om] LT",
            lastWeek: "[afgelopen] dddd [om] LT",
            sameElse: "L"
          },
          relativeTime: {
            future: "over %s",
            past: "%s geleden",
            s: "een paar seconden",
            m: "één minuut",
            mm: "%d minuten",
            h: "één uur",
            hh: "%d uur",
            d: "één dag",
            dd: "%d dagen",
            M: "één maand",
            MM: "%d maanden",
            y: "één jaar",
            yy: "%d jaar"
          },
          ordinalParse: /\d{1,2}(ste|de)/,
          ordinal: function (e) {
            return e + (1 === e || 8 === e || e >= 20 ? "ste" : "de")
          },
          week: {
            dow: 1,
            doy: 4
          }
        });
      return i
    })
  }, {
    "../moment": 15
  }],
  8: [function (e, t, n) {
    ! function (i, s) {
      "object" == typeof n && "undefined" != typeof t && "function" == typeof e ? s(e("../moment")) : "function" == typeof define && define.amd ? define(["moment"], s) : s(i.moment)
    }(this, function (e) {
      "use strict";

      function t(e) {
        return 5 > e % 10 && e % 10 > 1 && ~~(e / 10) % 10 !== 1
      }

      function n(e, n, i) {
        var s = e + " ";
        switch (i) {
          case "m":
            return n ? "minuta" : "minutę";
          case "mm":
            return s + (t(e) ? "minuty" : "minut");
          case "h":
            return n ? "godzina" : "godzinę";
          case "hh":
            return s + (t(e) ? "godziny" : "godzin");
          case "MM":
            return s + (t(e) ? "miesiące" : "miesięcy");
          case "yy":
            return s + (t(e) ? "lata" : "lat")
        }
      }
      var i = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),
        s = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"),
        a = e.defineLocale("pl", {
          months: function (e, t) {
            return "" === t ? "(" + s[e.month()] + "|" + i[e.month()] + ")" : /D MMMM/.test(t) ? s[e.month()] : i[e.month()]
          },
          monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
          weekdays: "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
          weekdaysShort: "nie_pon_wt_śr_czw_pt_sb".split("_"),
          weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),
          longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
          },
          calendar: {
            sameDay: "[Dziś o] LT",
            nextDay: "[Jutro o] LT",
            nextWeek: "[W] dddd [o] LT",
            lastDay: "[Wczoraj o] LT",
            lastWeek: function () {
              switch (this.day()) {
                case 0:
                  return "[W zeszłą niedzielę o] LT";
                case 3:
                  return "[W zeszłą środę o] LT";
                case 6:
                  return "[W zeszłą sobotę o] LT";
                default:
                  return "[W zeszły] dddd [o] LT"
              }
            },
            sameElse: "L"
          },
          relativeTime: {
            future: "za %s",
            past: "%s temu",
            s: "kilka sekund",
            m: n,
            mm: n,
            h: n,
            hh: n,
            d: "1 dzień",
            dd: "%d dni",
            M: "miesiąc",
            MM: n,
            y: "rok",
            yy: n
          },
          ordinalParse: /\d{1,2}\./,
          ordinal: "%d.",
          week: {
            dow: 1,
            doy: 4
          }
        });
      return a
    })
  }, {
    "../moment": 15
  }],
  9: [function (e, t, n) {
    ! function (i, s) {
      "object" == typeof n && "undefined" != typeof t && "function" == typeof e ? s(e("../moment")) : "function" == typeof define && define.amd ? define(["moment"], s) : s(i.moment)
    }(this, function (e) {
      "use strict";
      var t = e.defineLocale("pt", {
        months: "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
        monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
        weekdays: "Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_"),
        weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
        weekdaysMin: "Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),
        longDateFormat: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D [de] MMMM [de] YYYY",
          LLL: "D [de] MMMM [de] YYYY HH:mm",
          LLLL: "dddd, D [de] MMMM [de] YYYY HH:mm"
        },
        calendar: {
          sameDay: "[Hoje às] LT",
          nextDay: "[Amanhã às] LT",
          nextWeek: "dddd [às] LT",
          lastDay: "[Ontem às] LT",
          lastWeek: function () {
            return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" : "[Última] dddd [às] LT"
          },
          sameElse: "L"
        },
        relativeTime: {
          future: "em %s",
          past: "há %s",
          s: "segundos",
          m: "um minuto",
          mm: "%d minutos",
          h: "uma hora",
          hh: "%d horas",
          d: "um dia",
          dd: "%d dias",
          M: "um mês",
          MM: "%d meses",
          y: "um ano",
          yy: "%d anos"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº",
        week: {
          dow: 1,
          doy: 4
        }
      });
      return t
    })
  }, {
    "../moment": 15
  }],
  10: [function (e, t, n) {
    ! function (i, s) {
      "object" == typeof n && "undefined" != typeof t && "function" == typeof e ? s(e("../moment")) : "function" == typeof define && define.amd ? define(["moment"], s) : s(i.moment)
    }(this, function (e) {
      "use strict";

      function t(e, t) {
        var n = e.split("_");
        return t % 10 === 1 && t % 100 !== 11 ? n[0] : t % 10 >= 2 && 4 >= t % 10 && (10 > t % 100 || t % 100 >= 20) ? n[1] : n[2]
      }

      function n(e, n, i) {
        var s = {
          mm: n ? "минута_минуты_минут" : "минуту_минуты_минут",
          hh: "час_часа_часов",
          dd: "день_дня_дней",
          MM: "месяц_месяца_месяцев",
          yy: "год_года_лет"
        };
        return "m" === i ? n ? "минута" : "минуту" : e + " " + t(s[i], +e)
      }
      var i = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[й|я]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i],
        s = e.defineLocale("ru", {
          months: {
            format: "Января_Февраля_Марта_Апреля_Мая_Июня_Июля_Августа_Сентября_Октября_Ноября_Декабря".split("_"),
            standalone: "Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь".split("_")
          },
          monthsShort: {
            format: "янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split("_"),
            standalone: "янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_")
          },
          weekdays: {
            standalone: "Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота".split("_"),
            format: "Воскресенье_Понедельник_Вторник_Среду_Четверг_Пятницу_Субботу".split("_"),
            isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
          },
          weekdaysShort: "Вс_Пн_Вт_Ср_Чт_Пт_Сб".split("_"),
          weekdaysMin: "Вс_Пн_Вт_Ср_Чт_Пт_Сб".split("_"),
          monthsParse: i,
          longMonthsParse: i,
          shortMonthsParse: i,
          longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY г.",
            LLL: "D MMMM YYYY г., HH:mm",
            LLLL: "dddd, D MMMM YYYY г., HH:mm"
          },
          calendar: {
            sameDay: "[Сегодня в] LT",
            nextDay: "[Завтра в] LT",
            lastDay: "[Вчера в] LT",
            nextWeek: function (e) {
              if (e.week() === this.week()) return 2 === this.day() ? "[Во] dddd [в] LT" : "[В] dddd [в] LT";
              switch (this.day()) {
                case 0:
                  return "[В следующее] dddd [в] LT";
                case 1:
                case 2:
                case 4:
                  return "[В следующий] dddd [в] LT";
                case 3:
                case 5:
                case 6:
                  return "[В следующую] dddd [в] LT"
              }
            },
            lastWeek: function (e) {
              if (e.week() === this.week()) return 2 === this.day() ? "[Во] dddd [в] LT" : "[В] dddd [в] LT";
              switch (this.day()) {
                case 0:
                  return "[В прошлое] dddd [в] LT";
                case 1:
                case 2:
                case 4:
                  return "[В прошлый] dddd [в] LT";
                case 3:
                case 5:
                case 6:
                  return "[В прошлую] dddd [в] LT"
              }
            },
            sameElse: "L"
          },
          relativeTime: {
            future: "через %s",
            past: "%s назад",
            s: "несколько секунд",
            m: n,
            mm: n,
            h: "час",
            hh: n,
            d: "день",
            dd: n,
            M: "месяц",
            MM: n,
            y: "год",
            yy: n
          },
          meridiemParse: /ночи|утра|дня|вечера/i,
          isPM: function (e) {
            return /^(дня|вечера)$/.test(e)
          },
          meridiem: function (e, t, n) {
            return 4 > e ? "ночи" : 12 > e ? "утра" : 17 > e ? "дня" : "вечера"
          },
          ordinalParse: /\d{1,2}-(й|го|я)/,
          ordinal: function (e, t) {
            switch (t) {
              case "M":
              case "d":
              case "DDD":
                return e + "-й";
              case "D":
                return e + "-го";
              case "w":
              case "W":
                return e + "-я";
              default:
                return e
            }
          },
          week: {
            dow: 1,
            doy: 7
          }
        });
      return s
    })
  }, {
    "../moment": 15
  }],
  11: [function (e, t, n) {
    ! function (i, s) {
      "object" == typeof n && "undefined" != typeof t && "function" == typeof e ? s(e("../moment")) : "function" == typeof define && define.amd ? define(["moment"], s) : s(i.moment)
    }(this, function (e) {
      "use strict";
      var t = {
          1: "'inci",
          5: "'inci",
          8: "'inci",
          70: "'inci",
          80: "'inci",
          2: "'nci",
          7: "'nci",
          20: "'nci",
          50: "'nci",
          3: "'üncü",
          4: "'üncü",
          100: "'üncü",
          6: "'ncı",
          9: "'uncu",
          10: "'uncu",
          30: "'uncu",
          60: "'ıncı",
          90: "'ıncı"
        },
        n = e.defineLocale("tr", {
          months: "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
          monthsShort: "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
          weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
          weekdaysShort: "Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
          weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
          longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
          },
          calendar: {
            sameDay: "[bugün saat] LT",
            nextDay: "[yarın saat] LT",
            nextWeek: "[haftaya] dddd [saat] LT",
            lastDay: "[dün] LT",
            lastWeek: "[geçen hafta] dddd [saat] LT",
            sameElse: "L"
          },
          relativeTime: {
            future: "%s sonra",
            past: "%s önce",
            s: "birkaç saniye",
            m: "bir dakika",
            mm: "%d dakika",
            h: "bir saat",
            hh: "%d saat",
            d: "bir gün",
            dd: "%d gün",
            M: "bir ay",
            MM: "%d ay",
            y: "bir yıl",
            yy: "%d yıl"
          },
          ordinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
          ordinal: function (e) {
            if (0 === e) return e + "'ıncı";
            var n = e % 10,
              i = e % 100 - n,
              s = e >= 100 ? 100 : null;
            return e + (t[n] || t[i] || t[s])
          },
          week: {
            dow: 1,
            doy: 7
          }
        });
      return n
    })
  }, {
    "../moment": 15
  }],
  12: [function (e, t, n) {
    ! function (i, s) {
      "object" == typeof n && "undefined" != typeof t && "function" == typeof e ? s(e("../moment")) : "function" == typeof define && define.amd ? define(["moment"], s) : s(i.moment)
    }(this, function (e) {
      "use strict";

      function t(e, t) {
        var n = e.split("_");
        return t % 10 === 1 && t % 100 !== 11 ? n[0] : t % 10 >= 2 && 4 >= t % 10 && (10 > t % 100 || t % 100 >= 20) ? n[1] : n[2]
      }

      function n(e, n, i) {
        var s = {
          mm: n ? "хвилина_хвилини_хвилин" : "хвилину_хвилини_хвилин",
          hh: n ? "година_години_годин" : "годину_години_годин",
          dd: "день_дні_днів",
          MM: "місяць_місяці_місяців",
          yy: "рік_роки_років"
        };
        return "m" === i ? n ? "хвилина" : "хвилину" : "h" === i ? n ? "година" : "годину" : e + " " + t(s[i], +e)
      }

      function i(e, t) {
        var n = {
            nominative: "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),
            accusative: "неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),
            genitive: "неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")
          },
          i = /(\[[ВвУу]\]) ?dddd/.test(t) ? "accusative" : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(t) ? "genitive" : "nominative";
        return n[i][e.day()]
      }

      function s(e) {
        return function () {
          return e + "о" + (11 === this.hours() ? "б" : "") + "] LT"
        }
      }
      var a = e.defineLocale("uk", {
        months: {
          format: "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"),
          standalone: "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_")
        },
        monthsShort: "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),
        weekdays: i,
        weekdaysShort: "нд_пн_вт_ср_чт_пт_сб".split("_"),
        weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
        longDateFormat: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D MMMM YYYY р.",
          LLL: "D MMMM YYYY р., HH:mm",
          LLLL: "dddd, D MMMM YYYY р., HH:mm"
        },
        calendar: {
          sameDay: s("[Сьогодні "),
          nextDay: s("[Завтра "),
          lastDay: s("[Вчора "),
          nextWeek: s("[У] dddd ["),
          lastWeek: function () {
            switch (this.day()) {
              case 0:
              case 3:
              case 5:
              case 6:
                return s("[Минулої] dddd [").call(this);
              case 1:
              case 2:
              case 4:
                return s("[Минулого] dddd [").call(this)
            }
          },
          sameElse: "L"
        },
        relativeTime: {
          future: "за %s",
          past: "%s тому",
          s: "декілька секунд",
          m: n,
          mm: n,
          h: "годину",
          hh: n,
          d: "день",
          dd: n,
          M: "місяць",
          MM: n,
          y: "рік",
          yy: n
        },
        meridiemParse: /ночі|ранку|дня|вечора/,
        isPM: function (e) {
          return /^(дня|вечора)$/.test(e)
        },
        meridiem: function (e, t, n) {
          return 4 > e ? "ночі" : 12 > e ? "ранку" : 17 > e ? "дня" : "вечора"
        },
        ordinalParse: /\d{1,2}-(й|го)/,
        ordinal: function (e, t) {
          switch (t) {
            case "M":
            case "d":
            case "DDD":
            case "w":
            case "W":
              return e + "-й";
            case "D":
              return e + "-го";
            default:
              return e
          }
        },
        week: {
          dow: 1,
          doy: 7
        }
      });
      return a
    })
  }, {
    "../moment": 15
  }],
  13: [function (e, t, n) {
    ! function (i, s) {
      "object" == typeof n && "undefined" != typeof t && "function" == typeof e ? s(e("../moment")) : "function" == typeof define && define.amd ? define(["moment"], s) : s(i.moment)
    }(this, function (e) {
      "use strict";
      var t = e.defineLocale("zh-cn", {
        months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
        weekdaysMin: "日_一_二_三_四_五_六".split("_"),
        longDateFormat: {
          LT: "Ah点mm分",
          LTS: "Ah点m分s秒",
          L: "YYYY-MM-DD",
          LL: "YYYY年MMMD日",
          LLL: "YYYY年MMMD日Ah点mm分",
          LLLL: "YYYY年MMMD日ddddAh点mm分",
          l: "YYYY-MM-DD",
          ll: "YYYY年MMMD日",
          lll: "YYYY年MMMD日Ah点mm分",
          llll: "YYYY年MMMD日ddddAh点mm分"
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (e, t) {
          return 12 === e && (e = 0), "凌晨" === t || "早上" === t || "上午" === t ? e : "下午" === t || "晚上" === t ? e + 12 : e >= 11 ? e : e + 12
        },
        meridiem: function (e, t, n) {
          var i = 100 * e + t;
          return 600 > i ? "凌晨" : 900 > i ? "早上" : 1130 > i ? "上午" : 1230 > i ? "中午" : 1800 > i ? "下午" : "晚上"
        },
        calendar: {
          sameDay: function () {
            return 0 === this.minutes() ? "[今天]Ah[点整]" : "[今天]LT"
          },
          nextDay: function () {
            return 0 === this.minutes() ? "[明天]Ah[点整]" : "[明天]LT"
          },
          lastDay: function () {
            return 0 === this.minutes() ? "[昨天]Ah[点整]" : "[昨天]LT"
          },
          nextWeek: function () {
            var t, n;
            return t = e().startOf("week"), n = this.unix() - t.unix() >= 604800 ? "[下]" : "[本]", 0 === this.minutes() ? n + "dddAh点整" : n + "dddAh点mm"
          },
          lastWeek: function () {
            var t, n;
            return t = e().startOf("week"), n = this.unix() < t.unix() ? "[上]" : "[本]", 0 === this.minutes() ? n + "dddAh点整" : n + "dddAh点mm"
          },
          sameElse: "LL"
        },
        ordinalParse: /\d{1,2}(日|月|周)/,
        ordinal: function (e, t) {
          switch (t) {
            case "d":
            case "D":
            case "DDD":
              return e + "日";
            case "M":
              return e + "月";
            case "w":
            case "W":
              return e + "周";
            default:
              return e
          }
        },
        relativeTime: {
          future: "%s内",
          past: "%s前",
          s: "几秒",
          m: "1 分钟",
          mm: "%d 分钟",
          h: "1 小时",
          hh: "%d 小时",
          d: "1 天",
          dd: "%d 天",
          M: "1 个月",
          MM: "%d 个月",
          y: "1 年",
          yy: "%d 年"
        },
        week: {
          dow: 1,
          doy: 4
        }
      });
      return t
    })
  }, {
    "../moment": 15
  }],
  14: [function (e, t, n) {
    ! function (i, s) {
      "object" == typeof n && "undefined" != typeof t && "function" == typeof e ? s(e("../moment")) : "function" == typeof define && define.amd ? define(["moment"], s) : s(i.moment)
    }(this, function (e) {
      "use strict";
      var t = e.defineLocale("zh-tw", {
        months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
        weekdaysMin: "日_一_二_三_四_五_六".split("_"),
        longDateFormat: {
          LT: "Ah點mm分",
          LTS: "Ah點m分s秒",
          L: "YYYY年MMMD日",
          LL: "YYYY年MMMD日",
          LLL: "YYYY年MMMD日Ah點mm分",
          LLLL: "YYYY年MMMD日ddddAh點mm分",
          l: "YYYY年MMMD日",
          ll: "YYYY年MMMD日",
          lll: "YYYY年MMMD日Ah點mm分",
          llll: "YYYY年MMMD日ddddAh點mm分"
        },
        meridiemParse: /早上|上午|中午|下午|晚上/,
        meridiemHour: function (e, t) {
          return 12 === e && (e = 0), "早上" === t || "上午" === t ? e : "中午" === t ? e >= 11 ? e : e + 12 : "下午" === t || "晚上" === t ? e + 12 : void 0
        },
        meridiem: function (e, t, n) {
          var i = 100 * e + t;
          return 900 > i ? "早上" : 1130 > i ? "上午" : 1230 > i ? "中午" : 1800 > i ? "下午" : "晚上"
        },
        calendar: {
          sameDay: "[今天]LT",
          nextDay: "[明天]LT",
          nextWeek: "[下]ddddLT",
          lastDay: "[昨天]LT",
          lastWeek: "[上]ddddLT",
          sameElse: "L"
        },
        ordinalParse: /\d{1,2}(日|月|週)/,
        ordinal: function (e, t) {
          switch (t) {
            case "d":
            case "D":
            case "DDD":
              return e + "日";
            case "M":
              return e + "月";
            case "w":
            case "W":
              return e + "週";
            default:
              return e
          }
        },
        relativeTime: {
          future: "%s內",
          past: "%s前",
          s: "幾秒",
          m: "一分鐘",
          mm: "%d分鐘",
          h: "一小時",
          hh: "%d小時",
          d: "一天",
          dd: "%d天",
          M: "一個月",
          MM: "%d個月",
          y: "一年",
          yy: "%d年"
        }
      });
      return t
    })
  }, {
    "../moment": 15
  }],
  15: [function (e, t, n) {
    ! function (e, i) {
      "object" == typeof n && "undefined" != typeof t ? t.exports = i() : "function" == typeof define && define.amd ? define(i) : e.moment = i()
    }(this, function () {
      "use strict";

      function n() {
        return qn.apply(null, arguments)
      }

      function i(e) {
        qn = e
      }

      function s(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
      }

      function a(e) {
        return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
      }

      function r(e, t) {
        var n, i = [];
        for (n = 0; n < e.length; ++n) i.push(t(e[n], n));
        return i
      }

      function o(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }

      function d(e, t) {
        for (var n in t) o(t, n) && (e[n] = t[n]);
        return o(t, "toString") && (e.toString = t.toString), o(t, "valueOf") && (e.valueOf = t.valueOf), e
      }

      function u(e, t, n, i) {
        return je(e, t, n, i, !0).utc()
      }

      function l() {
        return {
          empty: !1,
          unusedTokens: [],
          unusedInput: [],
          overflow: -2,
          charsLeftOver: 0,
          nullInput: !1,
          invalidMonth: null,
          invalidFormat: !1,
          userInvalidated: !1,
          iso: !1
        }
      }

      function m(e) {
        return null == e._pf && (e._pf = l()), e._pf
      }

      function c(e) {
        if (null == e._isValid) {
          var t = m(e);
          e._isValid = !(isNaN(e._d.getTime()) || !(t.overflow < 0) || t.empty || t.invalidMonth || t.invalidWeekday || t.nullInput || t.invalidFormat || t.userInvalidated), e._strict && (e._isValid = e._isValid && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour)
        }
        return e._isValid
      }

      function _(e) {
        var t = u(NaN);
        return null != e ? d(m(t), e) : m(t).userInvalidated = !0, t
      }

      function h(e) {
        return void 0 === e
      }

      function f(e, t) {
        var n, i, s;
        if (h(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), h(t._i) || (e._i = t._i), h(t._f) || (e._f = t._f), h(t._l) || (e._l = t._l), h(t._strict) || (e._strict = t._strict), h(t._tzm) || (e._tzm = t._tzm), h(t._isUTC) || (e._isUTC = t._isUTC), h(t._offset) || (e._offset = t._offset), h(t._pf) || (e._pf = m(t)), h(t._locale) || (e._locale = t._locale), Qn.length > 0)
          for (n in Qn) i = Qn[n], s = t[i], h(s) || (e[i] = s);
        return e
      }

      function p(e) {
        f(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), Kn === !1 && (Kn = !0, n.updateOffset(this), Kn = !1)
      }

      function y(e) {
        return e instanceof p || null != e && null != e._isAMomentObject
      }

      function M(e) {
        return 0 > e ? Math.ceil(e) : Math.floor(e)
      }

      function g(e) {
        var t = +e,
          n = 0;
        return 0 !== t && isFinite(t) && (n = M(t)), n
      }

      function Y(e, t, n) {
        var i, s = Math.min(e.length, t.length),
          a = Math.abs(e.length - t.length),
          r = 0;
        for (i = 0; s > i; i++)(n && e[i] !== t[i] || !n && g(e[i]) !== g(t[i])) && r++;
        return r + a
      }

      function w() {}

      function D(e) {
        return e ? e.toLowerCase().replace("_", "-") : e
      }

      function k(e) {
        for (var t, n, i, s, a = 0; a < e.length;) {
          for (s = D(e[a]).split("-"), t = s.length, n = D(e[a + 1]), n = n ? n.split("-") : null; t > 0;) {
            if (i = v(s.slice(0, t).join("-"))) return i;
            if (n && n.length >= t && Y(s, n, !0) >= t - 1) break;
            t--
          }
          a++
        }
        return null
      }

      function v(n) {
        var i = null;
        if (!Xn[n] && "undefined" != typeof t && t && t.exports) try {
          i = $n._abbr, e("./locale/" + n), L(i)
        } catch (s) {}
        return Xn[n]
      }

      function L(e, t) {
        var n;
        return e && (n = h(t) ? T(e) : S(e, t), n && ($n = n)), $n._abbr
      }

      function S(e, t) {
        return null !== t ? (t.abbr = e, Xn[e] = Xn[e] || new w, Xn[e].set(t), L(e), Xn[e]) : (delete Xn[e], null)
      }

      function T(e) {
        var t;
        if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return $n;
        if (!s(e)) {
          if (t = v(e)) return t;
          e = [e]
        }
        return k(e)
      }

      function b(e, t) {
        var n = e.toLowerCase();
        ei[n] = ei[n + "s"] = ei[t] = e
      }

      function x(e) {
        return "string" == typeof e ? ei[e] || ei[e.toLowerCase()] : void 0
      }

      function H(e) {
        var t, n, i = {};
        for (n in e) o(e, n) && (t = x(n), t && (i[t] = e[n]));
        return i
      }

      function j(e) {
        return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e)
      }

      function W(e, t) {
        return function (i) {
          return null != i ? (P(this, e, i), n.updateOffset(this, t), this) : O(this, e)
        }
      }

      function O(e, t) {
        return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN
      }

      function P(e, t, n) {
        e.isValid() && e._d["set" + (e._isUTC ? "UTC" : "") + t](n)
      }

      function F(e, t) {
        var n;
        if ("object" == typeof e)
          for (n in e) this.set(n, e[n]);
        else if (e = x(e), j(this[e])) return this[e](t);
        return this
      }

      function z(e, t, n) {
        var i = "" + Math.abs(e),
          s = t - i.length,
          a = e >= 0;
        return (a ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, s)).toString().substr(1) + i
      }

      function A(e, t, n, i) {
        var s = i;
        "string" == typeof i && (s = function () {
          return this[i]()
        }), e && (si[e] = s), t && (si[t[0]] = function () {
          return z(s.apply(this, arguments), t[1], t[2])
        }), n && (si[n] = function () {
          return this.localeData().ordinal(s.apply(this, arguments), e)
        })
      }

      function C(e) {
        return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
      }

      function U(e) {
        var t, n, i = e.match(ti);
        for (t = 0, n = i.length; n > t; t++) si[i[t]] ? i[t] = si[i[t]] : i[t] = C(i[t]);
        return function (s) {
          var a = "";
          for (t = 0; n > t; t++) a += i[t] instanceof Function ? i[t].call(s, e) : i[t];
          return a
        }
      }

      function E(e, t) {
        return e.isValid() ? (t = G(t, e.localeData()), ii[t] = ii[t] || U(t), ii[t](e)) : e.localeData().invalidDate()
      }

      function G(e, t) {
        function n(e) {
          return t.longDateFormat(e) || e
        }
        var i = 5;
        for (ni.lastIndex = 0; i >= 0 && ni.test(e);) e = e.replace(ni, n), ni.lastIndex = 0, i -= 1;
        return e
      }

      function I(e, t, n) {
        Di[e] = j(t) ? t : function (e, i) {
          return e && n ? n : t
        }
      }

      function N(e, t) {
        return o(Di, e) ? Di[e](t._strict, t._locale) : new RegExp(V(e))
      }

      function V(e) {
        return R(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (e, t, n, i, s) {
          return t || n || i || s
        }))
      }

      function R(e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
      }

      function J(e, t) {
        var n, i = t;
        for ("string" == typeof e && (e = [e]), "number" == typeof t && (i = function (e, n) {
            n[t] = g(e)
          }), n = 0; n < e.length; n++) ki[e[n]] = i
      }

      function B(e, t) {
        J(e, function (e, n, i, s) {
          i._w = i._w || {}, t(e, i._w, i, s)
        })
      }

      function Z(e, t, n) {
        null != t && o(ki, e) && ki[e](t, n._a, n, e)
      }

      function q(e, t) {
        return new Date(Date.UTC(e, t + 1, 0)).getUTCDate()
      }

      function $(e, t) {
        return s(this._months) ? this._months[e.month()] : this._months[Oi.test(t) ? "format" : "standalone"][e.month()]
      }

      function Q(e, t) {
        return s(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Oi.test(t) ? "format" : "standalone"][e.month()]
      }

      function K(e, t, n) {
        var i, s, a;
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), i = 0; 12 > i; i++) {
          if (s = u([2e3, i]), n && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(s, "").replace(".", "") + "$", "i"), this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(s, "").replace(".", "") + "$", "i")), n || this._monthsParse[i] || (a = "^" + this.months(s, "") + "|^" + this.monthsShort(s, ""), this._monthsParse[i] = new RegExp(a.replace(".", ""), "i")), n && "MMMM" === t && this._longMonthsParse[i].test(e)) return i;
          if (n && "MMM" === t && this._shortMonthsParse[i].test(e)) return i;
          if (!n && this._monthsParse[i].test(e)) return i
        }
      }

      function X(e, t) {
        var n;
        return e.isValid() ? "string" == typeof t && (t = e.localeData().monthsParse(t), "number" != typeof t) ? e : (n = Math.min(e.date(), q(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e) : e
      }

      function ee(e) {
        return null != e ? (X(this, e), n.updateOffset(this, !0), this) : O(this, "Month")
      }

      function te() {
        return q(this.year(), this.month())
      }

      function ne(e) {
        return this._monthsParseExact ? (o(this, "_monthsRegex") || se.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex
      }

      function ie(e) {
        return this._monthsParseExact ? (o(this, "_monthsRegex") || se.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex
      }

      function se() {
        function e(e, t) {
          return t.length - e.length
        }
        var t, n, i = [],
          s = [],
          a = [];
        for (t = 0; 12 > t; t++) n = u([2e3, t]), i.push(this.monthsShort(n, "")), s.push(this.months(n, "")), a.push(this.months(n, "")), a.push(this.monthsShort(n, ""));
        for (i.sort(e), s.sort(e), a.sort(e), t = 0; 12 > t; t++) i[t] = R(i[t]), s[t] = R(s[t]), a[t] = R(a[t]);
        this._monthsRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + s.join("|") + ")$", "i"), this._monthsShortStrictRegex = new RegExp("^(" + i.join("|") + ")$", "i")
      }

      function ae(e) {
        var t, n = e._a;
        return n && -2 === m(e).overflow && (t = n[Li] < 0 || n[Li] > 11 ? Li : n[Si] < 1 || n[Si] > q(n[vi], n[Li]) ? Si : n[Ti] < 0 || n[Ti] > 24 || 24 === n[Ti] && (0 !== n[bi] || 0 !== n[xi] || 0 !== n[Hi]) ? Ti : n[bi] < 0 || n[bi] > 59 ? bi : n[xi] < 0 || n[xi] > 59 ? xi : n[Hi] < 0 || n[Hi] > 999 ? Hi : -1, m(e)._overflowDayOfYear && (vi > t || t > Si) && (t = Si), m(e)._overflowWeeks && -1 === t && (t = ji), m(e)._overflowWeekday && -1 === t && (t = Wi), m(e).overflow = t), e
      }

      function re(e) {
        n.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
      }

      function oe(e, t) {
        var n = !0;
        return d(function () {
          return n && (re(e + "\nArguments: " + Array.prototype.slice.call(arguments).join(", ") + "\n" + (new Error).stack), n = !1), t.apply(this, arguments)
        }, t)
      }

      function de(e, t) {
        Ci[e] || (re(t), Ci[e] = !0)
      }

      function ue(e) {
        var t, n, i, s, a, r, o = e._i,
          d = Ui.exec(o) || Ei.exec(o);
        if (d) {
          for (m(e).iso = !0, t = 0, n = Ii.length; n > t; t++)
            if (Ii[t][1].exec(d[1])) {
              s = Ii[t][0], i = Ii[t][2] !== !1;
              break
            } if (null == s) return void(e._isValid = !1);
          if (d[3]) {
            for (t = 0, n = Ni.length; n > t; t++)
              if (Ni[t][1].exec(d[3])) {
                a = (d[2] || " ") + Ni[t][0];
                break
              } if (null == a) return void(e._isValid = !1)
          }
          if (!i && null != a) return void(e._isValid = !1);
          if (d[4]) {
            if (!Gi.exec(d[4])) return void(e._isValid = !1);
            r = "Z"
          }
          e._f = s + (a || "") + (r || ""), ve(e)
        } else e._isValid = !1
      }

      function le(e) {
        var t = Vi.exec(e._i);
        return null !== t ? void(e._d = new Date(+t[1])) : (ue(e), void(e._isValid === !1 && (delete e._isValid, n.createFromInputFallback(e))))
      }

      function me(e, t, n, i, s, a, r) {
        var o = new Date(e, t, n, i, s, a, r);
        return 100 > e && e >= 0 && isFinite(o.getFullYear()) && o.setFullYear(e), o
      }

      function ce(e) {
        var t = new Date(Date.UTC.apply(null, arguments));
        return 100 > e && e >= 0 && isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e), t
      }

      function _e(e) {
        return he(e) ? 366 : 365
      }

      function he(e) {
        return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
      }

      function fe() {
        return he(this.year())
      }

      function pe(e, t, n) {
        var i = 7 + t - n,
          s = (7 + ce(e, 0, i).getUTCDay() - t) % 7;
        return -s + i - 1
      }

      function ye(e, t, n, i, s) {
        var a, r, o = (7 + n - i) % 7,
          d = pe(e, i, s),
          u = 1 + 7 * (t - 1) + o + d;
        return 0 >= u ? (a = e - 1, r = _e(a) + u) : u > _e(e) ? (a = e + 1, r = u - _e(e)) : (a = e, r = u), {
          year: a,
          dayOfYear: r
        }
      }

      function Me(e, t, n) {
        var i, s, a = pe(e.year(), t, n),
          r = Math.floor((e.dayOfYear() - a - 1) / 7) + 1;
        return 1 > r ? (s = e.year() - 1, i = r + ge(s, t, n)) : r > ge(e.year(), t, n) ? (i = r - ge(e.year(), t, n), s = e.year() + 1) : (s = e.year(), i = r), {
          week: i,
          year: s
        }
      }

      function ge(e, t, n) {
        var i = pe(e, t, n),
          s = pe(e + 1, t, n);
        return (_e(e) - i + s) / 7
      }

      function Ye(e, t, n) {
        return null != e ? e : null != t ? t : n
      }

      function we(e) {
        var t = new Date(n.now());
        return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
      }

      function De(e) {
        var t, n, i, s, a = [];
        if (!e._d) {
          for (i = we(e), e._w && null == e._a[Si] && null == e._a[Li] && ke(e), e._dayOfYear && (s = Ye(e._a[vi], i[vi]), e._dayOfYear > _e(s) && (m(e)._overflowDayOfYear = !0), n = ce(s, 0, e._dayOfYear), e._a[Li] = n.getUTCMonth(), e._a[Si] = n.getUTCDate()), t = 0; 3 > t && null == e._a[t]; ++t) e._a[t] = a[t] = i[t];
          for (; 7 > t; t++) e._a[t] = a[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
          24 === e._a[Ti] && 0 === e._a[bi] && 0 === e._a[xi] && 0 === e._a[Hi] && (e._nextDay = !0, e._a[Ti] = 0), e._d = (e._useUTC ? ce : me).apply(null, a), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[Ti] = 24)
        }
      }

      function ke(e) {
        var t, n, i, s, a, r, o, d;
        t = e._w, null != t.GG || null != t.W || null != t.E ? (a = 1, r = 4, n = Ye(t.GG, e._a[vi], Me(We(), 1, 4).year), i = Ye(t.W, 1), s = Ye(t.E, 1), (1 > s || s > 7) && (d = !0)) : (a = e._locale._week.dow, r = e._locale._week.doy, n = Ye(t.gg, e._a[vi], Me(We(), a, r).year), i = Ye(t.w, 1), null != t.d ? (s = t.d, (0 > s || s > 6) && (d = !0)) : null != t.e ? (s = t.e + a, (t.e < 0 || t.e > 6) && (d = !0)) : s = a), 1 > i || i > ge(n, a, r) ? m(e)._overflowWeeks = !0 : null != d ? m(e)._overflowWeekday = !0 : (o = ye(n, i, s, a, r), e._a[vi] = o.year, e._dayOfYear = o.dayOfYear)
      }

      function ve(e) {
        if (e._f === n.ISO_8601) return void ue(e);
        e._a = [], m(e).empty = !0;
        var t, i, s, a, r, o = "" + e._i,
          d = o.length,
          u = 0;
        for (s = G(e._f, e._locale).match(ti) || [], t = 0; t < s.length; t++) a = s[t], i = (o.match(N(a, e)) || [])[0], i && (r = o.substr(0, o.indexOf(i)), r.length > 0 && m(e).unusedInput.push(r), o = o.slice(o.indexOf(i) + i.length), u += i.length), si[a] ? (i ? m(e).empty = !1 : m(e).unusedTokens.push(a), Z(a, i, e)) : e._strict && !i && m(e).unusedTokens.push(a);
        m(e).charsLeftOver = d - u, o.length > 0 && m(e).unusedInput.push(o), m(e).bigHour === !0 && e._a[Ti] <= 12 && e._a[Ti] > 0 && (m(e).bigHour = void 0), e._a[Ti] = Le(e._locale, e._a[Ti], e._meridiem), De(e), ae(e)
      }

      function Le(e, t, n) {
        var i;
        return null == n ? t : null != e.meridiemHour ? e.meridiemHour(t, n) : null != e.isPM ? (i = e.isPM(n), i && 12 > t && (t += 12), i || 12 !== t || (t = 0), t) : t
      }

      function Se(e) {
        var t, n, i, s, a;
        if (0 === e._f.length) return m(e).invalidFormat = !0, void(e._d = new Date(NaN));
        for (s = 0; s < e._f.length; s++) a = 0, t = f({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._f = e._f[s], ve(t), c(t) && (a += m(t).charsLeftOver, a += 10 * m(t).unusedTokens.length, m(t).score = a, (null == i || i > a) && (i = a, n = t));
        d(e, n || t)
      }

      function Te(e) {
        if (!e._d) {
          var t = H(e._i);
          e._a = r([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function (e) {
            return e && parseInt(e, 10)
          }), De(e)
        }
      }

      function be(e) {
        var t = new p(ae(xe(e)));
        return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t
      }

      function xe(e) {
        var t = e._i,
          n = e._f;
        return e._locale = e._locale || T(e._l), null === t || void 0 === n && "" === t ? _({
          nullInput: !0
        }) : ("string" == typeof t && (e._i = t = e._locale.preparse(t)), y(t) ? new p(ae(t)) : (s(n) ? Se(e) : n ? ve(e) : a(t) ? e._d = t : He(e), c(e) || (e._d = null), e))
      }

      function He(e) {
        var t = e._i;
        void 0 === t ? e._d = new Date(n.now()) : a(t) ? e._d = new Date(+t) : "string" == typeof t ? le(e) : s(t) ? (e._a = r(t.slice(0), function (e) {
          return parseInt(e, 10)
        }), De(e)) : "object" == typeof t ? Te(e) : "number" == typeof t ? e._d = new Date(t) : n.createFromInputFallback(e)
      }

      function je(e, t, n, i, s) {
        var a = {};
        return "boolean" == typeof n && (i = n, n = void 0), a._isAMomentObject = !0, a._useUTC = a._isUTC = s, a._l = n, a._i = e, a._f = t, a._strict = i, be(a)
      }

      function We(e, t, n, i) {
        return je(e, t, n, i, !1)
      }

      function Oe(e, t) {
        var n, i;
        if (1 === t.length && s(t[0]) && (t = t[0]), !t.length) return We();
        for (n = t[0], i = 1; i < t.length; ++i)(!t[i].isValid() || t[i][e](n)) && (n = t[i]);
        return n
      }

      function Pe() {
        var e = [].slice.call(arguments, 0);
        return Oe("isBefore", e)
      }

      function Fe() {
        var e = [].slice.call(arguments, 0);
        return Oe("isAfter", e)
      }

      function ze(e) {
        var t = H(e),
          n = t.year || 0,
          i = t.quarter || 0,
          s = t.month || 0,
          a = t.week || 0,
          r = t.day || 0,
          o = t.hour || 0,
          d = t.minute || 0,
          u = t.second || 0,
          l = t.millisecond || 0;
        this._milliseconds = +l + 1e3 * u + 6e4 * d + 36e5 * o, this._days = +r + 7 * a, this._months = +s + 3 * i + 12 * n, this._data = {}, this._locale = T(), this._bubble()
      }

      function Ae(e) {
        return e instanceof ze
      }

      function Ce(e, t) {
        A(e, 0, 0, function () {
          var e = this.utcOffset(),
            n = "+";
          return 0 > e && (e = -e, n = "-"), n + z(~~(e / 60), 2) + t + z(~~e % 60, 2)
        })
      }

      function Ue(e, t) {
        var n = (t || "").match(e) || [],
          i = n[n.length - 1] || [],
          s = (i + "").match(qi) || ["-", 0, 0],
          a = +(60 * s[1]) + g(s[2]);
        return "+" === s[0] ? a : -a
      }

      function Ee(e, t) {
        var i, s;
        return t._isUTC ? (i = t.clone(), s = (y(e) || a(e) ? +e : +We(e)) - +i, i._d.setTime(+i._d + s), n.updateOffset(i, !1), i) : We(e).local()
      }

      function Ge(e) {
        return 15 * -Math.round(e._d.getTimezoneOffset() / 15)
      }

      function Ie(e, t) {
        var i, s = this._offset || 0;
        return this.isValid() ? null != e ? ("string" == typeof e ? e = Ue(gi, e) : Math.abs(e) < 16 && (e = 60 * e), !this._isUTC && t && (i = Ge(this)), this._offset = e, this._isUTC = !0, null != i && this.add(i, "m"), s !== e && (!t || this._changeInProgress ? st(this, Xe(e - s, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, n.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? s : Ge(this) : null != e ? this : NaN
      }

      function Ne(e, t) {
        return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset()
      }

      function Ve(e) {
        return this.utcOffset(0, e)
      }

      function Re(e) {
        return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Ge(this), "m")), this
      }

      function Je() {
        return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Ue(Mi, this._i)), this
      }

      function Be(e) {
        return this.isValid() ? (e = e ? We(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0) : !1
      }

      function Ze() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
      }

      function qe() {
        if (!h(this._isDSTShifted)) return this._isDSTShifted;
        var e = {};
        if (f(e, this), e = xe(e), e._a) {
          var t = e._isUTC ? u(e._a) : We(e._a);
          this._isDSTShifted = this.isValid() && Y(e._a, t.toArray()) > 0
        } else this._isDSTShifted = !1;
        return this._isDSTShifted
      }

      function $e() {
        return this.isValid() ? !this._isUTC : !1
      }

      function Qe() {
        return this.isValid() ? this._isUTC : !1
      }

      function Ke() {
        return this.isValid() ? this._isUTC && 0 === this._offset : !1
      }

      function Xe(e, t) {
        var n, i, s, a = e,
          r = null;
        return Ae(e) ? a = {
          ms: e._milliseconds,
          d: e._days,
          M: e._months
        } : "number" == typeof e ? (a = {}, t ? a[t] = e : a.milliseconds = e) : (r = $i.exec(e)) ? (n = "-" === r[1] ? -1 : 1, a = {
          y: 0,
          d: g(r[Si]) * n,
          h: g(r[Ti]) * n,
          m: g(r[bi]) * n,
          s: g(r[xi]) * n,
          ms: g(r[Hi]) * n
        }) : (r = Qi.exec(e)) ? (n = "-" === r[1] ? -1 : 1, a = {
          y: et(r[2], n),
          M: et(r[3], n),
          d: et(r[4], n),
          h: et(r[5], n),
          m: et(r[6], n),
          s: et(r[7], n),
          w: et(r[8], n)
        }) : null == a ? a = {} : "object" == typeof a && ("from" in a || "to" in a) && (s = nt(We(a.from), We(a.to)), a = {}, a.ms = s.milliseconds, a.M = s.months), i = new ze(a), Ae(e) && o(e, "_locale") && (i._locale = e._locale), i
      }

      function et(e, t) {
        var n = e && parseFloat(e.replace(",", "."));
        return (isNaN(n) ? 0 : n) * t
      }

      function tt(e, t) {
        var n = {
          milliseconds: 0,
          months: 0
        };
        return n.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = +t - +e.clone().add(n.months, "M"), n
      }

      function nt(e, t) {
        var n;
        return e.isValid() && t.isValid() ? (t = Ee(t, e), e.isBefore(t) ? n = tt(e, t) : (n = tt(t, e), n.milliseconds = -n.milliseconds, n.months = -n.months), n) : {
          milliseconds: 0,
          months: 0
        }
      }

      function it(e, t) {
        return function (n, i) {
          var s, a;
          return null === i || isNaN(+i) || (de(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period)."), a = n, n = i, i = a), n = "string" == typeof n ? +n : n, s = Xe(n, i), st(this, s, e), this
        }
      }

      function st(e, t, i, s) {
        var a = t._milliseconds,
          r = t._days,
          o = t._months;
        e.isValid() && (s = null == s ? !0 : s, a && e._d.setTime(+e._d + a * i), r && P(e, "Date", O(e, "Date") + r * i), o && X(e, O(e, "Month") + o * i), s && n.updateOffset(e, r || o))
      }

      function at(e, t) {
        var n = e || We(),
          i = Ee(n, this).startOf("day"),
          s = this.diff(i, "days", !0),
          a = -6 > s ? "sameElse" : -1 > s ? "lastWeek" : 0 > s ? "lastDay" : 1 > s ? "sameDay" : 2 > s ? "nextDay" : 7 > s ? "nextWeek" : "sameElse",
          r = t && (j(t[a]) ? t[a]() : t[a]);
        return this.format(r || this.localeData().calendar(a, this, We(n)))
      }

      function rt() {
        return new p(this)
      }

      function ot(e, t) {
        var n = y(e) ? e : We(e);
        return this.isValid() && n.isValid() ? (t = x(h(t) ? "millisecond" : t), "millisecond" === t ? +this > +n : +n < +this.clone().startOf(t)) : !1
      }

      function dt(e, t) {
        var n = y(e) ? e : We(e);
        return this.isValid() && n.isValid() ? (t = x(h(t) ? "millisecond" : t), "millisecond" === t ? +n > +this : +this.clone().endOf(t) < +n) : !1
      }

      function ut(e, t, n) {
        return this.isAfter(e, n) && this.isBefore(t, n)
      }

      function lt(e, t) {
        var n, i = y(e) ? e : We(e);
        return this.isValid() && i.isValid() ? (t = x(t || "millisecond"), "millisecond" === t ? +this === +i : (n = +i, +this.clone().startOf(t) <= n && n <= +this.clone().endOf(t))) : !1
      }

      function mt(e, t) {
        return this.isSame(e, t) || this.isAfter(e, t)
      }

      function ct(e, t) {
        return this.isSame(e, t) || this.isBefore(e, t)
      }

      function _t(e, t, n) {
        var i, s, a, r;
        return this.isValid() ? (i = Ee(e, this), i.isValid() ? (s = 6e4 * (i.utcOffset() - this.utcOffset()), t = x(t), "year" === t || "month" === t || "quarter" === t ? (r = ht(this, i), "quarter" === t ? r /= 3 : "year" === t && (r /= 12)) : (a = this - i, r = "second" === t ? a / 1e3 : "minute" === t ? a / 6e4 : "hour" === t ? a / 36e5 : "day" === t ? (a - s) / 864e5 : "week" === t ? (a - s) / 6048e5 : a), n ? r : M(r)) : NaN) : NaN
      }

      function ht(e, t) {
        var n, i, s = 12 * (t.year() - e.year()) + (t.month() - e.month()),
          a = e.clone().add(s, "months");
        return 0 > t - a ? (n = e.clone().add(s - 1, "months"), i = (t - a) / (a - n)) : (n = e.clone().add(s + 1, "months"), i = (t - a) / (n - a)), -(s + i)
      }

      function ft() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
      }

      function pt() {
        var e = this.clone().utc();
        return 0 < e.year() && e.year() <= 9999 ? j(Date.prototype.toISOString) ? this.toDate().toISOString() : E(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : E(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
      }

      function yt(e) {
        var t = E(this, e || n.defaultFormat);
        return this.localeData().postformat(t)
      }

      function Mt(e, t) {
        return this.isValid() && (y(e) && e.isValid() || We(e).isValid()) ? Xe({
          to: this,
          from: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
      }

      function gt(e) {
        return this.from(We(), e)
      }

      function Yt(e, t) {
        return this.isValid() && (y(e) && e.isValid() || We(e).isValid()) ? Xe({
          from: this,
          to: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
      }

      function wt(e) {
        return this.to(We(), e)
      }

      function Dt(e) {
        var t;
        return void 0 === e ? this._locale._abbr : (t = T(e), null != t && (this._locale = t), this)
      }

      function kt() {
        return this._locale
      }

      function vt(e) {
        switch (e = x(e)) {
          case "year":
            this.month(0);
          case "quarter":
          case "month":
            this.date(1);
          case "week":
          case "isoWeek":
          case "day":
            this.hours(0);
          case "hour":
            this.minutes(0);
          case "minute":
            this.seconds(0);
          case "second":
            this.milliseconds(0)
        }
        return "week" === e && this.weekday(0), "isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), this
      }

      function Lt(e) {
        return e = x(e), void 0 === e || "millisecond" === e ? this : this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms")
      }

      function St() {
        return +this._d - 6e4 * (this._offset || 0)
      }

      function Tt() {
        return Math.floor(+this / 1e3)
      }

      function bt() {
        return this._offset ? new Date(+this) : this._d
      }

      function xt() {
        var e = this;
        return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
      }

      function Ht() {
        var e = this;
        return {
          years: e.year(),
          months: e.month(),
          date: e.date(),
          hours: e.hours(),
          minutes: e.minutes(),
          seconds: e.seconds(),
          milliseconds: e.milliseconds()
        }
      }

      function jt() {
        return this.isValid() ? this.toISOString() : "null"
      }

      function Wt() {
        return c(this)
      }

      function Ot() {
        return d({}, m(this))
      }

      function Pt() {
        return m(this).overflow
      }

      function Ft() {
        return {
          input: this._i,
          format: this._f,
          locale: this._locale,
          isUTC: this._isUTC,
          strict: this._strict
        }
      }

      function zt(e, t) {
        A(0, [e, e.length], 0, t)
      }

      function At(e) {
        return Gt.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
      }

      function Ct(e) {
        return Gt.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
      }

      function Ut() {
        return ge(this.year(), 1, 4)
      }

      function Et() {
        var e = this.localeData()._week;
        return ge(this.year(), e.dow, e.doy)
      }

      function Gt(e, t, n, i, s) {
        var a;
        return null == e ? Me(this, i, s).year : (a = ge(e, i, s), t > a && (t = a), It.call(this, e, t, n, i, s))
      }

      function It(e, t, n, i, s) {
        var a = ye(e, t, n, i, s),
          r = ce(a.year, 0, a.dayOfYear);
        return this.year(r.getUTCFullYear()), this.month(r.getUTCMonth()), this.date(r.getUTCDate()), this
      }

      function Nt(e) {
        return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
      }

      function Vt(e) {
        return Me(e, this._week.dow, this._week.doy).week
      }

      function Rt() {
        return this._week.dow
      }

      function Jt() {
        return this._week.doy
      }

      function Bt(e) {
        var t = this.localeData().week(this);
        return null == e ? t : this.add(7 * (e - t), "d")
      }

      function Zt(e) {
        var t = Me(this, 1, 4).week;
        return null == e ? t : this.add(7 * (e - t), "d")
      }

      function qt(e, t) {
        return "string" != typeof e ? e : isNaN(e) ? (e = t.weekdaysParse(e), "number" == typeof e ? e : null) : parseInt(e, 10)
      }

      function $t(e, t) {
        return s(this._weekdays) ? this._weekdays[e.day()] : this._weekdays[this._weekdays.isFormat.test(t) ? "format" : "standalone"][e.day()]
      }

      function Qt(e) {
        return this._weekdaysShort[e.day()]
      }

      function Kt(e) {
        return this._weekdaysMin[e.day()]
      }

      function Xt(e, t, n) {
        var i, s, a;
        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), i = 0; 7 > i; i++) {
          if (s = We([2e3, 1]).day(i), n && !this._fullWeekdaysParse[i] && (this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(s, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(s, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(s, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[i] || (a = "^" + this.weekdays(s, "") + "|^" + this.weekdaysShort(s, "") + "|^" + this.weekdaysMin(s, ""), this._weekdaysParse[i] = new RegExp(a.replace(".", ""), "i")), n && "dddd" === t && this._fullWeekdaysParse[i].test(e)) return i;
          if (n && "ddd" === t && this._shortWeekdaysParse[i].test(e)) return i;
          if (n && "dd" === t && this._minWeekdaysParse[i].test(e)) return i;
          if (!n && this._weekdaysParse[i].test(e)) return i
        }
      }

      function en(e) {
        if (!this.isValid()) return null != e ? this : NaN;
        var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != e ? (e = qt(e, this.localeData()), this.add(e - t, "d")) : t
      }

      function tn(e) {
        if (!this.isValid()) return null != e ? this : NaN;
        var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == e ? t : this.add(e - t, "d")
      }

      function nn(e) {
        return this.isValid() ? null == e ? this.day() || 7 : this.day(this.day() % 7 ? e : e - 7) : null != e ? this : NaN
      }

      function sn(e) {
        var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == e ? t : this.add(e - t, "d")
      }

      function an() {
        return this.hours() % 12 || 12
      }

      function rn(e, t) {
        A(e, 0, 0, function () {
          return this.localeData().meridiem(this.hours(), this.minutes(), t)
        })
      }

      function on(e, t) {
        return t._meridiemParse
      }

      function dn(e) {
        return "p" === (e + "").toLowerCase().charAt(0)
      }

      function un(e, t, n) {
        return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
      }

      function ln(e, t) {
        t[Hi] = g(1e3 * ("0." + e))
      }

      function mn() {
        return this._isUTC ? "UTC" : ""
      }

      function cn() {
        return this._isUTC ? "Coordinated Universal Time" : ""
      }

      function _n(e) {
        return We(1e3 * e)
      }

      function hn() {
        return We.apply(null, arguments).parseZone()
      }

      function fn(e, t, n) {
        var i = this._calendar[e];
        return j(i) ? i.call(t, n) : i
      }

      function pn(e) {
        var t = this._longDateFormat[e],
          n = this._longDateFormat[e.toUpperCase()];
        return t || !n ? t : (this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function (e) {
          return e.slice(1)
        }), this._longDateFormat[e])
      }

      function yn() {
        return this._invalidDate
      }

      function Mn(e) {
        return this._ordinal.replace("%d", e)
      }

      function gn(e) {
        return e
      }

      function Yn(e, t, n, i) {
        var s = this._relativeTime[n];
        return j(s) ? s(e, t, n, i) : s.replace(/%d/i, e)
      }

      function wn(e, t) {
        var n = this._relativeTime[e > 0 ? "future" : "past"];
        return j(n) ? n(t) : n.replace(/%s/i, t)
      }

      function Dn(e) {
        var t, n;
        for (n in e) t = e[n], j(t) ? this[n] = t : this["_" + n] = t;
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
      }

      function kn(e, t, n, i) {
        var s = T(),
          a = u().set(i, t);
        return s[n](a, e)
      }

      function vn(e, t, n, i, s) {
        if ("number" == typeof e && (t = e, e = void 0), e = e || "", null != t) return kn(e, t, n, s);
        var a, r = [];
        for (a = 0; i > a; a++) r[a] = kn(e, a, n, s);
        return r
      }

      function Ln(e, t) {
        return vn(e, t, "months", 12, "month")
      }

      function Sn(e, t) {
        return vn(e, t, "monthsShort", 12, "month")
      }

      function Tn(e, t) {
        return vn(e, t, "weekdays", 7, "day")
      }

      function bn(e, t) {
        return vn(e, t, "weekdaysShort", 7, "day")
      }

      function xn(e, t) {
        return vn(e, t, "weekdaysMin", 7, "day")
      }

      function Hn() {
        var e = this._data;
        return this._milliseconds = ws(this._milliseconds), this._days = ws(this._days), this._months = ws(this._months), e.milliseconds = ws(e.milliseconds), e.seconds = ws(e.seconds), e.minutes = ws(e.minutes), e.hours = ws(e.hours), e.months = ws(e.months), e.years = ws(e.years), this
      }

      function jn(e, t, n, i) {
        var s = Xe(t, n);
        return e._milliseconds += i * s._milliseconds, e._days += i * s._days, e._months += i * s._months, e._bubble()
      }

      function Wn(e, t) {
        return jn(this, e, t, 1)
      }

      function On(e, t) {
        return jn(this, e, t, -1)
      }

      function Pn(e) {
        return 0 > e ? Math.floor(e) : Math.ceil(e)
      }

      function Fn() {
        var e, t, n, i, s, a = this._milliseconds,
          r = this._days,
          o = this._months,
          d = this._data;
        return a >= 0 && r >= 0 && o >= 0 || 0 >= a && 0 >= r && 0 >= o || (a += 864e5 * Pn(An(o) + r), r = 0, o = 0), d.milliseconds = a % 1e3, e = M(a / 1e3), d.seconds = e % 60, t = M(e / 60), d.minutes = t % 60, n = M(t / 60), d.hours = n % 24, r += M(n / 24), s = M(zn(r)), o += s, r -= Pn(An(s)), i = M(o / 12), o %= 12, d.days = r, d.months = o, d.years = i, this
      }

      function zn(e) {
        return 4800 * e / 146097
      }

      function An(e) {
        return 146097 * e / 4800
      }

      function Cn(e) {
        var t, n, i = this._milliseconds;
        if (e = x(e), "month" === e || "year" === e) return t = this._days + i / 864e5, n = this._months + zn(t), "month" === e ? n : n / 12;
        switch (t = this._days + Math.round(An(this._months)), e) {
          case "week":
            return t / 7 + i / 6048e5;
          case "day":
            return t + i / 864e5;
          case "hour":
            return 24 * t + i / 36e5;
          case "minute":
            return 1440 * t + i / 6e4;
          case "second":
            return 86400 * t + i / 1e3;
          case "millisecond":
            return Math.floor(864e5 * t) + i;
          default:
            throw new Error("Unknown unit " + e)
        }
      }

      function Un() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * g(this._months / 12)
      }

      function En(e) {
        return function () {
          return this.as(e)
        }
      }

      function Gn(e) {
        return e = x(e), this[e + "s"]()
      }

      function In(e) {
        return function () {
          return this._data[e]
        }
      }

      function Nn() {
        return M(this.days() / 7)
      }

      function Vn(e, t, n, i, s) {
        return s.relativeTime(t || 1, !!n, e, i)
      }

      function Rn(e, t, n) {
        var i = Xe(e).abs(),
          s = As(i.as("s")),
          a = As(i.as("m")),
          r = As(i.as("h")),
          o = As(i.as("d")),
          d = As(i.as("M")),
          u = As(i.as("y")),
          l = s < Cs.s && ["s", s] || 1 >= a && ["m"] || a < Cs.m && ["mm", a] || 1 >= r && ["h"] || r < Cs.h && ["hh", r] || 1 >= o && ["d"] || o < Cs.d && ["dd", o] || 1 >= d && ["M"] || d < Cs.M && ["MM", d] || 1 >= u && ["y"] || ["yy", u];
        return l[2] = t, l[3] = +e > 0, l[4] = n, Vn.apply(null, l)
      }

      function Jn(e, t) {
        return void 0 === Cs[e] ? !1 : void 0 === t ? Cs[e] : (Cs[e] = t, !0)
      }

      function Bn(e) {
        var t = this.localeData(),
          n = Rn(this, !e, t);
        return e && (n = t.pastFuture(+this, n)), t.postformat(n)
      }

      function Zn() {
        var e, t, n, i = Us(this._milliseconds) / 1e3,
          s = Us(this._days),
          a = Us(this._months);
        e = M(i / 60), t = M(e / 60), i %= 60, e %= 60, n = M(a / 12), a %= 12;
        var r = n,
          o = a,
          d = s,
          u = t,
          l = e,
          m = i,
          c = this.asSeconds();
        return c ? (0 > c ? "-" : "") + "P" + (r ? r + "Y" : "") + (o ? o + "M" : "") + (d ? d + "D" : "") + (u || l || m ? "T" : "") + (u ? u + "H" : "") + (l ? l + "M" : "") + (m ? m + "S" : "") : "P0D"
      }
      var qn, $n, Qn = n.momentProperties = [],
        Kn = !1,
        Xn = {},
        ei = {},
        ti = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        ni = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        ii = {},
        si = {},
        ai = /\d/,
        ri = /\d\d/,
        oi = /\d{3}/,
        di = /\d{4}/,
        ui = /[+-]?\d{6}/,
        li = /\d\d?/,
        mi = /\d\d\d\d?/,
        ci = /\d\d\d\d\d\d?/,
        _i = /\d{1,3}/,
        hi = /\d{1,4}/,
        fi = /[+-]?\d{1,6}/,
        pi = /\d+/,
        yi = /[+-]?\d+/,
        Mi = /Z|[+-]\d\d:?\d\d/gi,
        gi = /Z|[+-]\d\d(?::?\d\d)?/gi,
        Yi = /[+-]?\d+(\.\d{1,3})?/,
        wi = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
        Di = {},
        ki = {},
        vi = 0,
        Li = 1,
        Si = 2,
        Ti = 3,
        bi = 4,
        xi = 5,
        Hi = 6,
        ji = 7,
        Wi = 8;
      A("M", ["MM", 2], "Mo", function () {
        return this.month() + 1
      }), A("MMM", 0, 0, function (e) {
        return this.localeData().monthsShort(this, e)
      }), A("MMMM", 0, 0, function (e) {
        return this.localeData().months(this, e)
      }), b("month", "M"), I("M", li), I("MM", li, ri), I("MMM", function (e, t) {
        return t.monthsShortRegex(e)
      }), I("MMMM", function (e, t) {
        return t.monthsRegex(e)
      }), J(["M", "MM"], function (e, t) {
        t[Li] = g(e) - 1
      }), J(["MMM", "MMMM"], function (e, t, n, i) {
        var s = n._locale.monthsParse(e, i, n._strict);
        null != s ? t[Li] = s : m(n).invalidMonth = e
      });
      var Oi = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,
        Pi = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        Fi = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        zi = wi,
        Ai = wi,
        Ci = {};
      n.suppressDeprecationWarnings = !1;
      var Ui = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
        Ei = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
        Gi = /Z|[+-]\d\d(?::?\d\d)?/,
        Ii = [
          ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
          ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
          ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
          ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
          ["YYYY-DDD", /\d{4}-\d{3}/],
          ["YYYY-MM", /\d{4}-\d\d/, !1],
          ["YYYYYYMMDD", /[+-]\d{10}/],
          ["YYYYMMDD", /\d{8}/],
          ["GGGG[W]WWE", /\d{4}W\d{3}/],
          ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
          ["YYYYDDD", /\d{7}/]
        ],
        Ni = [
          ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
          ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
          ["HH:mm:ss", /\d\d:\d\d:\d\d/],
          ["HH:mm", /\d\d:\d\d/],
          ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
          ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
          ["HHmmss", /\d\d\d\d\d\d/],
          ["HHmm", /\d\d\d\d/],
          ["HH", /\d\d/]
        ],
        Vi = /^\/?Date\((\-?\d+)/i;
      n.createFromInputFallback = oe("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (e) {
        e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
      }), A("Y", 0, 0, function () {
        var e = this.year();
        return 9999 >= e ? "" + e : "+" + e
      }), A(0, ["YY", 2], 0, function () {
        return this.year() % 100
      }), A(0, ["YYYY", 4], 0, "year"), A(0, ["YYYYY", 5], 0, "year"), A(0, ["YYYYYY", 6, !0], 0, "year"), b("year", "y"), I("Y", yi), I("YY", li, ri), I("YYYY", hi, di), I("YYYYY", fi, ui), I("YYYYYY", fi, ui), J(["YYYYY", "YYYYYY"], vi), J("YYYY", function (e, t) {
        t[vi] = 2 === e.length ? n.parseTwoDigitYear(e) : g(e)
      }), J("YY", function (e, t) {
        t[vi] = n.parseTwoDigitYear(e)
      }), J("Y", function (e, t) {
        t[vi] = parseInt(e, 10)
      }), n.parseTwoDigitYear = function (e) {
        return g(e) + (g(e) > 68 ? 1900 : 2e3)
      };
      var Ri = W("FullYear", !1);
      n.ISO_8601 = function () {};
      var Ji = oe("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function () {
          var e = We.apply(null, arguments);
          return this.isValid() && e.isValid() ? this > e ? this : e : _()
        }),
        Bi = oe("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function () {
          var e = We.apply(null, arguments);
          return this.isValid() && e.isValid() ? e > this ? this : e : _()
        }),
        Zi = function () {
          return Date.now ? Date.now() : +new Date
        };
      Ce("Z", ":"), Ce("ZZ", ""), I("Z", gi), I("ZZ", gi), J(["Z", "ZZ"], function (e, t, n) {
        n._useUTC = !0, n._tzm = Ue(gi, e)
      });
      var qi = /([\+\-]|\d\d)/gi;
      n.updateOffset = function () {};
      var $i = /(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,
        Qi = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
      Xe.fn = ze.prototype;
      var Ki = it(1, "add"),
        Xi = it(-1, "subtract");
      n.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
      var es = oe("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (e) {
        return void 0 === e ? this.localeData() : this.locale(e)
      });
      A(0, ["gg", 2], 0, function () {
        return this.weekYear() % 100
      }), A(0, ["GG", 2], 0, function () {
        return this.isoWeekYear() % 100
      }), zt("gggg", "weekYear"), zt("ggggg", "weekYear"), zt("GGGG", "isoWeekYear"), zt("GGGGG", "isoWeekYear"), b("weekYear", "gg"), b("isoWeekYear", "GG"), I("G", yi), I("g", yi), I("GG", li, ri), I("gg", li, ri), I("GGGG", hi, di), I("gggg", hi, di), I("GGGGG", fi, ui), I("ggggg", fi, ui), B(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, n, i) {
        t[i.substr(0, 2)] = g(e)
      }), B(["gg", "GG"], function (e, t, i, s) {
        t[s] = n.parseTwoDigitYear(e)
      }), A("Q", 0, "Qo", "quarter"), b("quarter", "Q"), I("Q", ai), J("Q", function (e, t) {
        t[Li] = 3 * (g(e) - 1)
      }), A("w", ["ww", 2], "wo", "week"), A("W", ["WW", 2], "Wo", "isoWeek"), b("week", "w"), b("isoWeek", "W"), I("w", li), I("ww", li, ri), I("W", li), I("WW", li, ri), B(["w", "ww", "W", "WW"], function (e, t, n, i) {
        t[i.substr(0, 1)] = g(e)
      });
      var ts = {
        dow: 0,
        doy: 6
      };
      A("D", ["DD", 2], "Do", "date"), b("date", "D"), I("D", li), I("DD", li, ri), I("Do", function (e, t) {
        return e ? t._ordinalParse : t._ordinalParseLenient
      }), J(["D", "DD"], Si), J("Do", function (e, t) {
        t[Si] = g(e.match(li)[0], 10)
      });
      var ns = W("Date", !0);
      A("d", 0, "do", "day"), A("dd", 0, 0, function (e) {
        return this.localeData().weekdaysMin(this, e)
      }), A("ddd", 0, 0, function (e) {
        return this.localeData().weekdaysShort(this, e)
      }), A("dddd", 0, 0, function (e) {
        return this.localeData().weekdays(this, e)
      }), A("e", 0, 0, "weekday"), A("E", 0, 0, "isoWeekday"), b("day", "d"), b("weekday", "e"), b("isoWeekday", "E"), I("d", li), I("e", li), I("E", li), I("dd", wi), I("ddd", wi), I("dddd", wi), B(["dd", "ddd", "dddd"], function (e, t, n, i) {
        var s = n._locale.weekdaysParse(e, i, n._strict);
        null != s ? t.d = s : m(n).invalidWeekday = e
      }), B(["d", "e", "E"], function (e, t, n, i) {
        t[i] = g(e)
      });
      var is = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        ss = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        as = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
      A("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), b("dayOfYear", "DDD"), I("DDD", _i), I("DDDD", oi), J(["DDD", "DDDD"], function (e, t, n) {
        n._dayOfYear = g(e)
      }), A("H", ["HH", 2], 0, "hour"), A("h", ["hh", 2], 0, an), A("hmm", 0, 0, function () {
        return "" + an.apply(this) + z(this.minutes(), 2)
      }), A("hmmss", 0, 0, function () {
        return "" + an.apply(this) + z(this.minutes(), 2) + z(this.seconds(), 2)
      }), A("Hmm", 0, 0, function () {
        return "" + this.hours() + z(this.minutes(), 2)
      }), A("Hmmss", 0, 0, function () {
        return "" + this.hours() + z(this.minutes(), 2) + z(this.seconds(), 2)
      }), rn("a", !0), rn("A", !1), b("hour", "h"), I("a", on), I("A", on), I("H", li), I("h", li), I("HH", li, ri), I("hh", li, ri), I("hmm", mi), I("hmmss", ci), I("Hmm", mi), I("Hmmss", ci), J(["H", "HH"], Ti), J(["a", "A"], function (e, t, n) {
        n._isPm = n._locale.isPM(e), n._meridiem = e
      }), J(["h", "hh"], function (e, t, n) {
        t[Ti] = g(e), m(n).bigHour = !0
      }), J("hmm", function (e, t, n) {
        var i = e.length - 2;
        t[Ti] = g(e.substr(0, i)), t[bi] = g(e.substr(i)), m(n).bigHour = !0
      }), J("hmmss", function (e, t, n) {
        var i = e.length - 4,
          s = e.length - 2;
        t[Ti] = g(e.substr(0, i)), t[bi] = g(e.substr(i, 2)), t[xi] = g(e.substr(s)), m(n).bigHour = !0
      }), J("Hmm", function (e, t, n) {
        var i = e.length - 2;
        t[Ti] = g(e.substr(0, i)), t[bi] = g(e.substr(i))
      }), J("Hmmss", function (e, t, n) {
        var i = e.length - 4,
          s = e.length - 2;
        t[Ti] = g(e.substr(0, i)), t[bi] = g(e.substr(i, 2)), t[xi] = g(e.substr(s))
      });
      var rs = /[ap]\.?m?\.?/i,
        os = W("Hours", !0);
      A("m", ["mm", 2], 0, "minute"), b("minute", "m"), I("m", li), I("mm", li, ri), J(["m", "mm"], bi);
      var ds = W("Minutes", !1);
      A("s", ["ss", 2], 0, "second"), b("second", "s"), I("s", li), I("ss", li, ri), J(["s", "ss"], xi);
      var us = W("Seconds", !1);
      A("S", 0, 0, function () {
        return ~~(this.millisecond() / 100)
      }), A(0, ["SS", 2], 0, function () {
        return ~~(this.millisecond() / 10)
      }), A(0, ["SSS", 3], 0, "millisecond"), A(0, ["SSSS", 4], 0, function () {
        return 10 * this.millisecond()
      }), A(0, ["SSSSS", 5], 0, function () {
        return 100 * this.millisecond()
      }), A(0, ["SSSSSS", 6], 0, function () {
        return 1e3 * this.millisecond()
      }), A(0, ["SSSSSSS", 7], 0, function () {
        return 1e4 * this.millisecond()
      }), A(0, ["SSSSSSSS", 8], 0, function () {
        return 1e5 * this.millisecond()
      }), A(0, ["SSSSSSSSS", 9], 0, function () {
        return 1e6 * this.millisecond()
      }), b("millisecond", "ms"), I("S", _i, ai), I("SS", _i, ri), I("SSS", _i, oi);
      var ls;
      for (ls = "SSSS"; ls.length <= 9; ls += "S") I(ls, pi);
      for (ls = "S"; ls.length <= 9; ls += "S") J(ls, ln);
      var ms = W("Milliseconds", !1);
      A("z", 0, 0, "zoneAbbr"), A("zz", 0, 0, "zoneName");
      var cs = p.prototype;
      cs.add = Ki, cs.calendar = at, cs.clone = rt, cs.diff = _t, cs.endOf = Lt, cs.format = yt, cs.from = Mt, cs.fromNow = gt, cs.to = Yt, cs.toNow = wt, cs.get = F, cs.invalidAt = Pt, cs.isAfter = ot, cs.isBefore = dt, cs.isBetween = ut, cs.isSame = lt, cs.isSameOrAfter = mt, cs.isSameOrBefore = ct, cs.isValid = Wt, cs.lang = es, cs.locale = Dt, cs.localeData = kt, cs.max = Bi, cs.min = Ji, cs.parsingFlags = Ot, cs.set = F, cs.startOf = vt, cs.subtract = Xi, cs.toArray = xt, cs.toObject = Ht, cs.toDate = bt, cs.toISOString = pt, cs.toJSON = jt, cs.toString = ft, cs.unix = Tt, cs.valueOf = St, cs.creationData = Ft, cs.year = Ri, cs.isLeapYear = fe, cs.weekYear = At, cs.isoWeekYear = Ct, cs.quarter = cs.quarters = Nt, cs.month = ee, cs.daysInMonth = te, cs.week = cs.weeks = Bt, cs.isoWeek = cs.isoWeeks = Zt, cs.weeksInYear = Et, cs.isoWeeksInYear = Ut, cs.date = ns, cs.day = cs.days = en, cs.weekday = tn, cs.isoWeekday = nn, cs.dayOfYear = sn, cs.hour = cs.hours = os, cs.minute = cs.minutes = ds, cs.second = cs.seconds = us, cs.millisecond = cs.milliseconds = ms, cs.utcOffset = Ie, cs.utc = Ve, cs.local = Re, cs.parseZone = Je, cs.hasAlignedHourOffset = Be, cs.isDST = Ze, cs.isDSTShifted = qe, cs.isLocal = $e, cs.isUtcOffset = Qe, cs.isUtc = Ke, cs.isUTC = Ke, cs.zoneAbbr = mn, cs.zoneName = cn, cs.dates = oe("dates accessor is deprecated. Use date instead.", ns), cs.months = oe("months accessor is deprecated. Use month instead", ee), cs.years = oe("years accessor is deprecated. Use year instead", Ri), cs.zone = oe("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", Ne);
      var _s = cs,
        hs = {
          sameDay: "[Today at] LT",
          nextDay: "[Tomorrow at] LT",
          nextWeek: "dddd [at] LT",
          lastDay: "[Yesterday at] LT",
          lastWeek: "[Last] dddd [at] LT",
          sameElse: "L"
        },
        fs = {
          LTS: "h:mm:ss A",
          LT: "h:mm A",
          L: "MM/DD/YYYY",
          LL: "MMMM D, YYYY",
          LLL: "MMMM D, YYYY h:mm A",
          LLLL: "dddd, MMMM D, YYYY h:mm A"
        },
        ps = "Invalid date",
        ys = "%d",
        Ms = /\d{1,2}/,
        gs = {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years"
        },
        Ys = w.prototype;
      Ys._calendar = hs, Ys.calendar = fn, Ys._longDateFormat = fs, Ys.longDateFormat = pn, Ys._invalidDate = ps, Ys.invalidDate = yn, Ys._ordinal = ys, Ys.ordinal = Mn, Ys._ordinalParse = Ms, Ys.preparse = gn, Ys.postformat = gn, Ys._relativeTime = gs, Ys.relativeTime = Yn, Ys.pastFuture = wn, Ys.set = Dn, Ys.months = $, Ys._months = Pi, Ys.monthsShort = Q, Ys._monthsShort = Fi, Ys.monthsParse = K, Ys._monthsRegex = Ai, Ys.monthsRegex = ie, Ys._monthsShortRegex = zi, Ys.monthsShortRegex = ne, Ys.week = Vt, Ys._week = ts, Ys.firstDayOfYear = Jt, Ys.firstDayOfWeek = Rt, Ys.weekdays = $t, Ys._weekdays = is, Ys.weekdaysMin = Kt, Ys._weekdaysMin = as, Ys.weekdaysShort = Qt, Ys._weekdaysShort = ss, Ys.weekdaysParse = Xt, Ys.isPM = dn, Ys._meridiemParse = rs, Ys.meridiem = un, L("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (e) {
          var t = e % 10,
            n = 1 === g(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
          return e + n
        }
      }), n.lang = oe("moment.lang is deprecated. Use moment.locale instead.", L), n.langData = oe("moment.langData is deprecated. Use moment.localeData instead.", T);
      var ws = Math.abs,
        Ds = En("ms"),
        ks = En("s"),
        vs = En("m"),
        Ls = En("h"),
        Ss = En("d"),
        Ts = En("w"),
        bs = En("M"),
        xs = En("y"),
        Hs = In("milliseconds"),
        js = In("seconds"),
        Ws = In("minutes"),
        Os = In("hours"),
        Ps = In("days"),
        Fs = In("months"),
        zs = In("years"),
        As = Math.round,
        Cs = {
          s: 45,
          m: 45,
          h: 22,
          d: 26,
          M: 11
        },
        Us = Math.abs,
        Es = ze.prototype;
      Es.abs = Hn, Es.add = Wn, Es.subtract = On, Es.as = Cn, Es.asMilliseconds = Ds, Es.asSeconds = ks, Es.asMinutes = vs, Es.asHours = Ls, Es.asDays = Ss, Es.asWeeks = Ts, Es.asMonths = bs, Es.asYears = xs, Es.valueOf = Un, Es._bubble = Fn, Es.get = Gn, Es.milliseconds = Hs, Es.seconds = js, Es.minutes = Ws, Es.hours = Os, Es.days = Ps, Es.weeks = Nn, Es.months = Fs, Es.years = zs, Es.humanize = Bn, Es.toISOString = Zn, Es.toString = Zn, Es.toJSON = Zn, Es.locale = Dt, Es.localeData = kt, Es.toIsoString = oe("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Zn), Es.lang = es, A("X", 0, 0, "unix"), A("x", 0, 0, "valueOf"), I("x", yi), I("X", Yi), J("X", function (e, t, n) {
          n._d = new Date(1e3 * parseFloat(e, 10))
        }), J("x", function (e, t, n) {
          n._d = new Date(g(e))
        }), n.version = "2.11.1", i(We), n.fn = _s, n.min = Pe, n.max = Fe, n.now = Zi, n.utc = u, n.unix = _n, n.months = Ln, n.isDate = a, n.locale = L, n.invalid = _, n.duration = Xe, n.isMoment = y, n.weekdays = Tn,
        n.parseZone = hn, n.localeData = T, n.isDuration = Ae, n.monthsShort = Sn, n.weekdaysMin = xn, n.defineLocale = S, n.weekdaysShort = bn, n.normalizeUnits = x, n.relativeTimeThreshold = Jn, n.prototype = _s;
      var Gs = n;
      return Gs
    })
  }, {}],
  16: [function (e, t, n) {
    var i = "https://raindrop.io",
      s = "/api/";
    t.exports = {
      host: i,
      apiPrefix: i + s,
      screenshotService: i + "/screenshot/?url=",
      contentTypes: ["link", "article", "image", "video"],
      proPage: i + "/static/pro",
      modalMargin: 30,
      languages: {
        id_ID: "Bahasa Indonesia",
        de_DE: "Deutsch",
        en_US: "English",
        es_ES: "Español",
        fr_FR: "Français",
        nl_NL: "Nederlands",
        pl_PL: "Polski",
        pt_BR: "Português (Brasil)",
        sv_SE: "Svenska",
        fi_FI: "Suomi",
        tr_TR: "Türkçe",
        kk_KZ: "Қазақ тілі",
        ru_RU: "Русский",
        uk_UA: "Українська мова",
        ko_KR: "한국어",
        zh_TW: "中文 (繁體)",
        zh_CN: "中文（简体）",
        hy_AM: "հայերեն"
      },
      backgroundImages: [{
        src: "",
        contrast: "black"
      }, {
        src: (window.pathPrefix || "") + "images/themes/reflectiononthelake.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/milleniumbridge.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/empireofthealps.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/brown-sunset.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/san-francisco.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/rocks.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/material-geometry.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/brown-rocks.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/material-view.jpg",
        contrast: "black"
      }, {
        src: (window.pathPrefix || "") + "images/themes/surf.jpg",
        contrast: "white"
      }, {
        src: (window.pathPrefix || "") + "images/themes/silver.jpg",
        contrast: "black"
      }],
      getBackgroundSelected: function () {
        var e = null,
          t = 0;
        try {
          null != localStorage.getItem("background-image") && (e = localStorage.getItem("background-image"))
        } catch (n) {}
        for (var i in this.backgroundImages)
          if (this.backgroundImages[i].src == e) {
            t = i;
            break
          } return t
      },
      setBackground: function (e) {
        var t = this.getBackgroundSelected();
        if (t >= 0) {
          var n = this.backgroundImages[t];
          document.documentElement.classList.remove("contrast-white"), document.documentElement.classList.remove("contrast-black"), document.documentElement.classList.add("contrast-" + n.contrast || "black");
          var i = function (e) {
            var t = function () {
              null != document.getElementById("app-background") && (document.getElementById("app-background").style.backgroundImage = 'url("' + e + '")')
            };
            null != document.getElementById("app-background") ? t() : document.addEventListener("DOMContentLoaded", t)
          };
          if (!n.src) return void i("about:blank");
          var s = (e || "") + n.src,
            a = null;
          try {
            localStorage.getItem(s)
          } catch (r) {}
          if (null == a) {
            var o = new XMLHttpRequest,
              d = new FileReader;
            o.onload = function () {
              if (4 == o.readyState && 200 == o.status) {
                var e = new Blob([o.response], {
                  type: "image/jpeg"
                });
                d.onload = function (e) {
                  var t = e.target.result;
                  i(t);
                  try {
                    localStorage.setItem(s, t)
                  } catch (n) {}
                }, d.readAsDataURL(e)
              }
            }, o.open("GET", s, !0), o.responseType = "arraybuffer", o.send()
          } else i(a)
        }
      },
      defaultCollectionIcon: function () {
        return network.fixURL("/other/popup/img/icon-folder.png")
      },
      getImportLink: function () {
        return "undefined" != typeof window.environment ? network.fixURL("/other/import/import.html") : "../import/index.html"
      }
    }
  }, {}],
  17: [function (e, t, n) {
    consts = e("./config"), consts.setBackground();
    var i = e("../modules/translate");
    i.setLang(), i.initJSfile(), window.sidebar = {
      open: -1 != (window.environment || []).indexOf("desktop"),
      className: "sidebar-open",
      change: function (e) {
        if (this.open = e, this.open) {
          document.documentElement.classList.add(window.sidebar.className);
          try {
            localStorage.setItem("sidebar-open", 1)
          } catch (t) {}
        } else {
          document.documentElement.classList.remove(window.sidebar.className);
          try {
            localStorage.removeItem("sidebar-open")
          } catch (t) {}
        }
      }
    };
    try {
      (localStorage.getItem("sidebar-open") || -1 != (window.environment || []).indexOf("desktop")) && (window.sidebar.open = !0, window.sidebar.change(!0))
    } catch (s) {}
    var a = e("../modules/strings.js");
    a.getCurrentBrowser().map(function (e) {
      document.documentElement.classList.add(e)
    });
    try {
      localStorage.setItem("openCount", parseInt(localStorage.getItem("openCount") || 0) + 1)
    } catch (s) {}
    var r = document.createElement("script");
    r.src = (window.pathPrefix || "") + "../common/js/analytics.js", document.head.appendChild(r)
  }, {
    "../modules/strings.js": 18,
    "../modules/translate": 19,
    "./config": 16
  }],
  18: [function (e, n, i) {
    n.exports = {
      getCurrentBrowser: function () {
        var e = [];
        return /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()) && e.push("chrome"), /constructor/i.test(window.HTMLElement) && e.push("safari"), "MozAppearance" in document.documentElement.style && e.push("firefox"), (window.opera || /opera|opr/i.test(navigator.userAgent)) && e.push("opera"), "WebkitAppearance" in document.documentElement.style && e.push("webkit"), -1 != navigator.appVersion.indexOf("Win") && e.push("Windows"), -1 != navigator.appVersion.indexOf("Mac") && e.push("MacOS"), -1 != navigator.appVersion.indexOf("X11") && e.push("UNIX"), -1 != navigator.appVersion.indexOf("Linux") && e.push("Linux"), e
      },
      swapArray: function (e, t, n) {
        var e = _.clone(e),
          i = _.clone(e[t]);
        return e[t] = _.clone(e[n]), e[n] = _.clone(i), e
      },
      parseSearch: function (e) {
        var t = "word",
          n = /type\-(image|video|link|article)/i;
        return e.match(new RegExp(/(^|\s)#([^ ]*)/i)) ? (t = "tag", e = e.replace(/,/g, "").replace(/#/g, "")) : e.match(new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/)) ? (t = "domain", e = e.toLowerCase()) : e.match(new RegExp(n)) && (t = "type", e = e.match(n)[1]), {
          key: t,
          val: e
        }
      },
      inputSelectAllMixin: {
        handleSelectAll: function (e) {
          e.target.focus(), e.target.select()
        }
      },
      getErrorFromJSON: function (e) {
        return "undefined" != typeof e.error ? t.s("server" + e.error) : "undefined" == typeof e.auth || e.auth ? t.s("server") : t.s("startToSave")
      },
      defaultTitle: function () {
        if (-1 != (window.environment || []).indexOf("desktop")) return "Raindrop.io";
        var e = t.s("pro_speed_dial");
        return -1 != e.indexOf("(") && (e = e.substr(0, e.indexOf("(") - 1)), e = S(e).replaceAll('"', "").s, -1 != e.indexOf("-") && (e = e.substr(0, e.indexOf("-") - 1)), e
      },
      beautifulDomain: function (e) {
        var t = "";
        try {
          t = network.cleanDomain(e)
        } catch (n) {}
        try {
          t = t.match(/(.*)\./i)[1]
        } catch (n) {}
        try {
          t = t.replace(/-/g, " ").replace(/_/g, " ")
        } catch (n) {}
        try {
          t = t.replace(/\w\S*/g, function (e) {
            return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
          })
        } catch (n) {}
        return t || e
      },
      copyTextToClipboard: function (e) {
        if ("undefined" != typeof MacGap) return void MacGap.Clipboard.copy(e);
        var t = document.createElement("textarea");
        t.style.position = "fixed", t.style.top = 0, t.style.left = 0, t.style.width = "2em", t.style.height = "2em", t.style.padding = 0, t.style.border = "none", t.style.outline = "none", t.style.boxShadow = "none", t.style.background = "transparent", t.value = e, document.body.appendChild(t), t.select();
        try {
          var n = document.execCommand("copy"),
            i = n ? "successful" : "unsuccessful";
          console.log("Copying text command was " + i)
        } catch (s) {
          console.log("Oops, unable to copy")
        }
        document.body.removeChild(t)
      },
      humanFileSize: function (e, t) {
        var n = t ? 1e3 : 1024;
        if (Math.abs(e) < n) return e + " B";
        var i = t ? ["Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"],
          s = -1;
        do e /= n, ++s; while (Math.abs(e) >= n && s < i.length - 1);
        return e.toFixed(1) + " " + i[s]
      },
      parseBrowserQuery: function () {
        var e = {};
        try {
          var t = window.location.search.substr(1, window.location.search.length).split("&");
          t.forEach(function (t) {
            var n = t.split("=");
            e[n[0]] = decodeURIComponent(n[1])
          })
        } catch (n) {}
        return e
      }
    }
  }, {}],
  19: [function (e, t, n) {
    e("moment/locale/id.js"), e("moment/locale/de.js"), e("moment/locale/es.js"), e("moment/locale/fr.js"), e("moment/locale/nl.js"), e("moment/locale/pl.js"), e("moment/locale/pt.js"), e("moment/locale/fi.js"), e("moment/locale/tr.js"), e("moment/locale/ru.js"), e("moment/locale/uk.js"), e("moment/locale/ko.js"), e("moment/locale/zh-cn.js"), e("moment/locale/zh-tw.js"), t.exports = {
      defaultLang: "en_US",
      currentLang: "en_US",
      getLang: function () {
        return this.currentLang
      },
      cleanLang: function (e) {
        for (var t in consts.languages)
          if (0 == t.indexOf(e)) return t;
        return this.defaultLang
      },
      setLang: function (e) {
        if ("undefined" == typeof e) {
          e = null;
          try {
            e = localStorage.getItem("language") || null
          } catch (t) {}
          if (null == e) {
            var n = navigator.language || navigator.userLanguage || "";
            try {
              n = n.trim().substr(0, 2).toLowerCase()
            } catch (t) {
              t && (n = "")
            }
            "" != n && (e = this.cleanLang(n))
          }
        }
        "undefined" == typeof consts.languages[e] && (e = this.defaultLang), this.currentLang = e;
        try {
          localStorage.setItem("language", this.currentLang)
        } catch (t) {}
        "undefined" != typeof moment ? moment.locale(this.currentLang) : "undefined" != typeof window.moment && window.moment.locale(this.currentLang)
      },
      s: function (e) {
        return "undefined" == typeof window["lang_" + this.currentLang] ? e : "undefined" != typeof window["lang_" + this.currentLang][e] ? window["lang_" + this.currentLang][e] : e
      },
      initJSfile: function () {
        var e = this,
          t = new XMLHttpRequest,
          n = (window.pathPrefix || "") + "../common/js/" + this.currentLang + ".json",
          i = new Event("langLoaded");
        t.onreadystatechange = function () {
          4 == t.readyState && t.responseText && (window["lang_" + e.currentLang] = JSON.parse(t.responseText), window.languageLoaded = !0, window.dispatchEvent(i))
        }, t.open("GET", n, !0), t.send()
      }
    }
  }, {
    "moment/locale/de.js": 1,
    "moment/locale/es.js": 2,
    "moment/locale/fi.js": 3,
    "moment/locale/fr.js": 4,
    "moment/locale/id.js": 5,
    "moment/locale/ko.js": 6,
    "moment/locale/nl.js": 7,
    "moment/locale/pl.js": 8,
    "moment/locale/pt.js": 9,
    "moment/locale/ru.js": 10,
    "moment/locale/tr.js": 11,
    "moment/locale/uk.js": 12,
    "moment/locale/zh-cn.js": 13,
    "moment/locale/zh-tw.js": 14
  }]
}, {}, [17]);
//# sourceMappingURL=init.js.map
