/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      // other libraries
      'rxjs':                      'npm:rxjs',
      'reflect-metadata':           'node_modules/reflect-metadata',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
       "ng2-modal": "node_modules/ng2-modal",
       "angular2-contextmenu": 'node_modules/angular2-contextmenu',
       "ng2-tooltip": "node_modules/ng2-tooltip",
       'moment': 'npm:moment/moment.js',
       'ng2-datepicker': 'npm:ng2-datepicker/bundle/ng2-datepicker.umd.js'

       
    
      
    
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },

      rxjs: {
        defaultExtension: 'js'
      },
      'reflect-metadata':{ main: 'Reflect.js', defaultExtension: 'js' },
      "ng2-modal": { "main": "index.js", "defaultExtension": "js" },

      "angular2-contextmenu": { main: 'angular2-contextmenu.js', defaultExtension: 'js' },
      "ng2-tooltip": { "main": "index.js", "defaultExtension": "js" },

    }
    
  });
})(this);
