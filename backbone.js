/**
 * Backbone.js
 *
 * This library is part of "Prix Framework", which is responsible 
 * to make Prix framework interactive and event handling easier.
 * 
 * This framework relies on jQuery.
 *
 *
 *
 *
 *
 * @author Akhil Kokani
 * @package Prix
**/



/** 
 * Class to hold DOM related operations
 * 
 * @author Akhil Kokani
 */
var skeleton = function() {};



/************************************************************
* SELECT MENU
*************************************************************/
/**
 * Select Menu
 *
 *
 * @package Backbone
 *
 * @return void
**/
skeleton.prototype.select = function() {

  /*a function that will close all select boxes in the document,
    except the current select box:*/
  function _closeAllSelect(elmnt) {

    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("prix-select-items");
    y = document.getElementsByClassName("prix-select-selected");

    for (i = 0; i < y.length; i++) {

      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("prix-select-arrow-active");
      }
    }

    for (i = 0; i < x.length; i++) {

      if (arrNo.indexOf(i)) {
        x[i].classList.add("prix-select-hide");
      }
    }
  }
  document.addEventListener("click", _closeAllSelect);

  // Variables
  var x, i, j, selElmnt, a, b, c;

  /*look for any elements with the class "prix-select":*/
  x = document.getElementsByClassName("prix-select");
  for (i = 0; i < x.length; i++) {

    selElmnt = x[i].getElementsByTagName("select")[0];

    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "prix-select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);

    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "prix-select-items prix-select-hide");
    for (j = 0; j < selElmnt.length; j++) {

      /*for each option in the original select element,
      create a new DIV that will act as an option item:*/
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function ( e ) {

          /*when an item is clicked, update the original select box,
          and the selected item:*/
          var y, i, k, s, h;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          h = this.parentNode.previousSibling;
          for (i = 0; i < s.length; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("prix-select-option-selected");
              for (k = 0; k < y.length; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "prix-select-option-selected");
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        _closeAllSelect(this);
        this.nextSibling.classList.toggle("prix-select-hide");
        this.classList.toggle("prix-select-arrow-active");
      });
  }
}
