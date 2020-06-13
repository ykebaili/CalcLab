/// <reference path="C:\www\\Aspectize.core\AspectizeIntellisense.js" />

Global.SimulationPhysiqueService = {

   aasService:'SimulationPhysiqueService',
   aasPublished:true,
      
   CommandName: function () {

   },

   Poursuite: function () {

       var nave = navigator.userAgent.toLowerCase();
       if (nave.indexOf("firefox") > -1) nave = "Firefox"; else nave = "Autre";
       const PI = Math.PI;
       var fenetre = document.getElementById('canvas');
       var hh = canvas.getContext('2d');
       hh.canvas.style.border = "3px solid #000";
       hh.translate(0.5, 0.5);
       var timer;
       var type = 1;
       var xs, ys, mouse1, mouse2;
       var R = 200, Np = 160, Nc = 11, n = 4;
       var ct = 0;
       var xi = [240, -200, -20], yi = [0, 120, -120];
       var x = [], y = [];
       for (var i = 0; i < Nc; i++) { x[i] = [Np]; y[i] = [Np]; }
       var X = [], Y = [];
       for (var i = 0; i < Nc; i++) { X[i] = [Np]; Y[i] = [Np]; }
       var phi = [Nc], rho = [];
       var psi = 2 * PI / n, r = R, rw = 6;
       var dx, dy, v = 5, alpha;
       var Xd = 20, Yd = 20;
       var xmin = -280, ymax = 220;
       var mode = false;
       var col = ["red", "blue", "green"];
       var rec1 = new Rect(97, 117, rw, rw);
       var rec2 = new Rect(248, 318, rw, rw);
       init_trace(n, 0);
       trace();

       // commandes    ***********************
       function Rect(x, y, w, h) {
           this.x = x;
           this.y = y;
           this.w = w;
           this.h = h;
       }

       function choix1() {
           type = 1;
           n = 4;
           document.getElementById('num').value = 4;
           document.getElementById('num').style.visibility = "visible";
           document.getElementById('chk').style.visibility = "visible";
           document.getElementById('lab').style.visibility = "visible";
           ct = 0;
           r = R;
           phi[0] = 0;
           psi = 2 * PI / n;
           init_trace(n, ct);
           trace();
       }

       function choix2() {
           type = 2;
           document.getElementById('num').style.visibility = "hidden";
           document.getElementById('chk').style.visibility = "hidden";
           document.getElementById('lab').style.visibility = "hidden";
           n = 3; ct = 0;
           initTrace();
           trace();
       }

       function choix3() {
           mode = !mode;
           trace();
       }

       function choix() {
           n = parseInt(document.getElementById('num').value);
           ct = 0;
           r = R;
           phi[0] = 0;
           psi = 2 * PI / n;
           init_trace(n, ct);
           trace();
       }

       function stop() {
           bt1.value = "Départ";
           clearInterval(timer);
       }

       function depart(bt1) {
           if (bt1.value === 'Départ') {
               bt1.value = "Stop";
               if (type === 1) {
                   ct = 0;
                   r = R;
                   phi[0] = 0;
                   init_trace(n, ct);
               }
               else {
                   ct = 0;
                   n = 3;
                   initTrace();
               }
               timer = setInterval(trace, 80);
           }
           else {
               stop();
           }
       }

       //*********************************************************** 

       function drawLine(xi, yi, xf, yf) {
           hh.beginPath();
           hh.moveTo(xi, yi);
           hh.lineTo(xf, yf);
           hh.stroke();
       }

       function cercle(xc, yc, R, flag) {
           hh.beginPath();
           hh.arc(xc, yc, R, 0, Math.PI * 2);
           if (flag) hh.fill();
           else hh.stroke();
       }

       function cadre3D(x, y, w, ha) {
           hh.strokeStyle = "rgb(130,130,130)";
           drawLine(x, y + 1, w - 1, y + 1); drawLine(x, y, x, ha);
           drawLine(x + 1, y, x + 1, ha - 1); drawLine(x, y, w, y);
           hh.strokeStyle = "rgb(230,230,230)";
           drawLine(x, ha, w, ha); drawLine(w, y + 1, w, ha);
           drawLine(x + 1, ha - 1, w, ha - 1); drawLine(w - 1, y + 2, w - 1, ha);
       }


       //******************************************************************
       fenetre.addEventListener("mousedown", function (evt) {
           if (nave === "Firefox") {
               var x = evt.pageX;
               var y = evt.pageY;
           }
           else {
               var x = evt.clientX;
               var y = evt.clientY;
           }
           var node = evt.target;
           while (node) {
               x -= node.offsetLeft - node.scrollLeft;
               y -= node.offsetTop - node.scrollTop;
               node = node.offsetParent;
           }
           xs = x - 3; ys = y - 3;
           if ((xs > rec2.x) && (xs < rec2.x + 6) && (ys > rec2.y) && (rec2.y + 6)) mouse2 = true;
           if ((xs > rec1.x) && (xs < rec1.x + 6) && (ys > rec1.y) && (rec1.y + 6)) mouse1 = true;
       });

       fenetre.addEventListener("mouseup", function (evt) {
           mouse1 = false; mouse2 = false;
           trace();
       });

       fenetre.addEventListener("mousemove", function (evt) {
           if (nave === "Firefox") {
               var xx = evt.pageX;		//page avec firefox		client avec chrome
               var yy = evt.pageY;
           }
           else {
               var xx = evt.clientX;		//page avec firefox		client avec chrome
               var yy = evt.clientY;
           }
           var node = evt.target;
           while (node) {
               xx -= node.offsetLeft - node.scrollLeft;
               yy -= node.offsetTop - node.scrollTop;
               node = node.offsetParent;
           }
           xs = xx - 3; ys = yy - 3;
           if (xs < 40) xs = 40;
           if (xs > 540) xs = 540;
           if (ys < 60) ys = 60;
           if (ys > 440) ys = 440;
           if (mouse1) {
               x[1][0] = xs - 300; y[1][0] = 240 - ys;
               xi[1] = xs - 300; yi[1] = 240 - ys;
               rec1.x = xs - 3; rec1.y = ys - 3;
               ct = 0;
               X[1][0] = Xd + (x[1][0] - xmin);
               Y[1][0] = Yd + (ymax - y[1][0]);
               trace();
           }
           if (mouse2) {
               x[2][0] = xs - 300; y[2][0] = 240 - ys;
               xi[2] = xs - 300; yi[2] = 240 - ys;
               rec2.x = xs - 3; rec2.y = ys - 3;
               ct = 0;
               X[2][0] = Xd + (x[2][0] - xmin);
               Y[2][0] = Yd + (ymax - y[2][0]);
               trace();
           }
       });
       //*****************************************************************************        
       function init_trace(n, c) {
           for (var i = 0; i < n; i++) {
               phi[i] = phi[0] + i * psi;
               x[i][c] = r * Math.cos(phi[i]);
               y[i][c] = r * Math.sin(phi[i]);
               X[i][c] = Xd + (x[i][c] - xmin);
               Y[i][c] = Yd + (ymax - y[i][c]);
           }
       }

       function initTrace() {
           for (var i = 0; i < 3; i++) {
               x[i][0] = xi[i]; y[i][0] = yi[i];
               X[i][0] = Xd + (x[i][0] - xmin);
               Y[i][0] = Yd + (ymax - y[i][0]);
           }
           rec1.x = xi[1] + 297; rec1.y = 237 - yi[1];
           rec2.x = xi[2] + 297; rec2.y = 237 - yi[2];
       }

       function initTrace2(c) {
           phi[0] = Math.atan2(y[1][c] - y[0][c], x[1][c] - x[0][c]);
           phi[1] = Math.atan2(y[2][c] - y[1][c], x[2][c] - x[1][c]);
           phi[2] = Math.atan2(y[0][c] - y[2][c], x[0][c] - x[2][c]);
           for (var i = 0; i < n; i++) {
               dx = v * Math.cos(phi[i]); dy = v * Math.sin(phi[i]);
               x[i][c + 1] = x[i][c] + dx;
               y[i][c + 1] = y[i][c] + dy;
               X[i][c + 1] = Xd + (x[i][c + 1] - xmin);
               Y[i][c + 1] = Yd + (ymax - y[i][c + 1]);
           }
           var A = x[1][c + 1] - x[0][c + 1];
           var B = y[1][c + 1] - y[0][c + 1];
           rho[0] = Math.sqrt(A * A + B * B);
           A = x[2][c + 1] - x[1][c + 1];
           B = y[2][c + 1] - y[1][c + 1];
           rho[1] = Math.sqrt(A * A + B * B);
       }

       function trace() {
           hh.fillStyle = "silver"; hh.fillRect(0, 0, 600, 480);
           hh.font = "bold 14px Arial";
           if (type === 1) {
               hh.lineWidth = 1.5;
               hh.strokeStyle = "gray";
               for (var i = 1; i < n; i++) drawLine(X[i - 1][0], Y[i - 1][0], X[i][0], Y[i][0]);
               drawLine(X[n - 1][0], Y[n - 1][0], X[0][0], Y[0][0]);
               alpha = Math.atan2(y[1][ct] - y[0][ct], x[1][ct] - x[0][ct]);
               dx = v * Math.cos(alpha); dy = v * Math.sin(alpha);
               x[0][ct + 1] = x[0][ct] + dx;
               y[0][ct + 1] = y[0][ct] + dy;
               phi[0] = Math.atan2(y[0][ct + 1], x[0][ct + 1]);
               //r = Math.hypot(x[0][ct + 1], y[0][ct + 1]);
               r = Math.sqrt(Math.pow(x[0][ct + 1], 2) + Math.pow(y[0][ct + 1], 2));
               if (r < 10) stop();
               init_trace(n, ct + 1);
               ct++;
               if (mode) {
                   hh.strokeStyle = "gray";
                   for (var j = 0; j < ct; j += 5) {
                       for (var i = 1; i < n; i++) drawLine(X[i - 1][j], Y[i - 1][j], X[i][j], Y[i][j]);
                       drawLine(X[n - 1][j], Y[n - 1][j], X[0][j], Y[0][j]);
                   }
               }
               else {
                   hh.strokeStyle = "blue";
                   for (var i = 1; i < n; i++) drawLine(X[i - 1][ct], Y[i - 1][ct], X[i][ct], Y[i][ct]);
                   drawLine(X[n - 1][ct], Y[n - 1][ct], X[0][ct], Y[0][ct]);
               }
               hh.strokeStyle = "red";
               for (var j = 0; j < n; j++) {
                   for (var i = 1; i <= ct; i++) drawLine(X[j][i - 1], Y[j][i - 1], X[j][i], Y[j][i]);
               }
           }
               //************************************
           else {
               hh.fillStyle = "brown";
               hh.textAlign = "center";
               hh.fillText("Glisser les carrés vert et bleu avec la souris", 300, 40);
               hh.strokeStyle = "gray";
               n = 3;
               for (var i = 1; i < n; i++) drawLine(X[i - 1][0], Y[i - 1][0], X[i][0], Y[i][0]);
               drawLine(X[n - 1][0], Y[n - 1][0], X[0][0], Y[0][0]);
               hh.fillStyle = (col[1]); hh.fillRect(rec1.x, rec1.y, rw, rw);
               hh.fillStyle = (col[2]); hh.fillRect(rec2.x, rec2.y, rw, rw);
               initTrace2(ct);
               ct++;
               hh.strokeStyle = "black";
               if (ct > 2) {
                   for (var i = 1; i < n; i++)
                       drawLine(X[i - 1][ct], Y[i - 1][ct], X[i][ct], Y[i][ct]);
                   drawLine(X[n - 1][ct], Y[n - 1][ct], X[0][ct], Y[0][ct]);
               }
               hh.strokeStyle = "red";
               for (var j = 0; j < n; j++) {
                   hh.strokeStyle = (col[j]);
                   for (var i = 1; i <= ct; i++) drawLine(X[j][i - 1], Y[j][i - 1], X[j][i], Y[j][i]);
                   if (ct % 3 === 0) cercle(X[j][ct], Y[j][ct], 3, false);
                   else cercle(X[j][ct], Y[j][ct], 3, false);
               }
               if (ct > 100) ct = 99;
               if ((rho[0] < 5) | (rho[1] < 5) | (ct > 98)) stop();
           }
           hh.lineWidth = 1;
           cadre3D(20, 20, 580, 460);
       }
   }
};

