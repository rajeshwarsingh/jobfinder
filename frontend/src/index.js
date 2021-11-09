import React from 'react'
import ReactDOM from 'react-dom'
import loadjs from "loadjs";
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import config from './config'
const { baseFrontenUrl, displayNameSettings } = config


loadjs(
  [
    	baseFrontenUrl+'/js/bootstrap-select.min.js',
		baseFrontenUrl+'/js/bootstrap-slider.min.js',
		baseFrontenUrl+'/js/chart.min.js',
		baseFrontenUrl+'/js/clipboard.min.js',
		baseFrontenUrl+'/js/counterup.min.js',
		baseFrontenUrl+'/js/counterup.min.js',
		baseFrontenUrl+'/js/custom.js',
		baseFrontenUrl+'/js/infobox.min.js',
		baseFrontenUrl+'/js/jquery-3.3.1.min.js',
		baseFrontenUrl+'/js/jquery-3.4.1.min.js',
		baseFrontenUrl+'/js/jquery-migrate-3.1.0.min.js',
		baseFrontenUrl+'/js/leaflet-autocomplete.js',
		baseFrontenUrl+'/js/leaflet-control-geocoder.js',
		baseFrontenUrl+'/js/leaflet-gesture-handling.min.js',
		baseFrontenUrl+'/js/leaflet-hireo.js',
		baseFrontenUrl+'/js/leaflet-markercluster.min.js',
		baseFrontenUrl+'/js/leaflet.min.js',
		baseFrontenUrl+'/js/magnific-popup.min.js',
		baseFrontenUrl+'/js/maps.js',
		baseFrontenUrl+'/js/markerclusterer.js',
		baseFrontenUrl+'/js/mmenu.min.js',
		baseFrontenUrl+'/js/simplebar.min.js',
		baseFrontenUrl+'/js/snackbar.js',
		baseFrontenUrl+'/js/tippy.all.min.js',
  ],
  {
    success: () => {
      // const editor = window.grapesjs.init({
      //   plugins: ["gjs-preset-newsletter"],
      //   container: "#app",
      //   autorender: false,
      //   fromElement: true
      // });

      // const comps = editor.DomComponents;
      // const defaultType = comps.getType("default");
      // const defaultModel = defaultType.model;

      // editor.DomComponents.addType("button-link", {
      //   model: defaultModel.extend(
      //     {
      //       toHTML(a) {
      //         return this.view.el.innerHTML;
      //       },
      //       init() {
      //         this.listenTo(this, "change:link-url change:text", () => {
      //           this.view.buttonEl.href = this.get("link-url") || "#";
      //           this.view.buttonEl.innerHTML =
      //             this.get("text") || "Text goes here";
      //         });
      //       },
      //       defaults: Object.assign({}, defaultModel.prototype.defaults, {
      //         droppable: false,
      //         traits: [
      //           {
      //             type: "url",
      //             label: "Link",
      //             name: "link-url",
      //             changeProp: 1,
      //             placeholder: "Enter or paste link here"
      //           },
      //           {
      //             type: "text",
      //             label: "Text",
      //             name: "text",
      //             changeProp: 1,
      //             placeholder: "Button text"
      //           }
      //         ]
      //       })
      //     },
      //     {
      //       isComponent(el) {
      //         if (
      //           el &&
      //           typeof el === "object" &&
      //           el.getAttribute &&
      //           el.hasAttribute("data-type") &&
      //           el.getAttribute("data-type") === "button-link"
      //         ) {
      //           return { type: "button-link" };
      //         }
      //       }
      //     }
      //   ),

      //   view: defaultType.view.extend({
      //     getButtonEl() {
      //       if (!this.buttonEl) {
      //         const btn = document.createElement("a");
      //         btn.href = this.model.get("link-url") || "#";
      //         btn.innerHTML = this.model.get("text") || "Text goes here";
      //         btn.className = "gjs-no-pointer button";
      //         btn.style["text-decoration"] = "none";
      //         btn.setAttribute("data-type", "button-link");
      //         this.buttonEl = btn;
      //       }
      //       return this.buttonEl;
      //     },

      //     render(...args) {
      //       defaultType.view.prototype.render.apply(this, args);
      //       this.el.appendChild(this.getButtonEl());
      //       return this;
      //     }
      //   })
      // });
      // editor.BlockManager.add("button-link", {
      //   label: "Button + link",
      //   category: "Basic",
      //   attributes: { class: "gjs-fonts gjs-f-button" },
      //   content: {
      //     type: "button-link"
      //   }
      // });

      // editor.render();
    },
    async: false
  }
);


ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('wrapper')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
