var turnClass = "blue";
(function(app, $, undefined) {
    app.TicTacToe = {};
    app.TicTacToe.init = function() {
        $( document ).ready(function() {
    
            var defTurns = [{item:"2v-5h", color:"red"}, {item:"2v-7h", color:"red"}, {item:"3v-4h", color:"red"}, {item:"3v-6h", color:"blue"}, {item:"4v-7h", color:"blue"}, {item:"5v-4h", color:"blue"}];
            var turns = [];
    
            $("#field").width($( window ).height());
    
            // vygeneruj hracie pole
            genField();
            // nahraj pociatocne pozicie
            genDefTurns();
    
            // generuje hracie pole
            function genField() {     
                var verPos = 0;
                for(v=0 ; v < 10 ; v++) {
                    verPos++;
                    var horPos = 0;
                    for(h=0 ; h < 10 ; h++) {
                        horPos++;
                        var item = '<span class="item" id="'+verPos+'v-'+horPos+'h">'
                        $('#field').append(item);
                    }
                }
            }
    
            // generuje prvotne pozicie
            function genDefTurns() {
                for(i=0 ; i < defTurns.length ; i++) {
                    $("#"+defTurns[i].item).addClass(defTurns[i].color);
                }
            }
    
            // vyvtvor tah
            $( ".item" ).click(function() {
                $(this).addClass( turnClass );
                // prehod pozicie vyherne za ohrozujuce 
                $('#field').toggleClass( "switch" );
                $(this).removeClass( "redop blueop" );
                var turn ={pos:this.id, color:turnClass};
                turns.push(turn);
                if(checkAll()){
                    switchClass();
                }
                else{
                }
            });
    
            // spusti sa replay hry
            $( ".replay" ).click(function() {
                $("#modalwrap").removeClass( "win red blue" );
                $(".item").removeClass("red blue");
                genDefTurns(defTurns);
                replay();        
            });
    
            function replay() {
                var i= 0;
                var interval = setInterval(function(){
                    $("#"+turns[i].pos).addClass( turns[i].color );    
                    i++;
                    if(i == turns.length){
                        clearInterval(interval);
                    }
                }, 300)
        
            }
    
            // tlacitko undo
            $('html').keyup(function(e){
                if(e.keyCode == 8)
                    if (turns.length != 0) {
                        var remove = turns.slice(-1)[0];
                    $("#"+remove.pos).removeClass( remove.color );
                    turns.splice(-1,1);
                    switchClass();
                }        
            })     
        });
        
        // druhy tah vymen farbu
        function switchClass() {    
            if(turnClass == "blue"){
                turnClass= "red";
            }
            else{
                turnClass= "blue";
            }
        }    
 
        // kontrola vsetkych kombinacii
        function checkAll() {
            horizontalVerticalWin();
            diagonalWin();
            diagonalWin2();
            diagonalWin3();
            return true;
        }

        // kontrola ci je 5 bodov v kontrolovanej ciare
        function check(line) {
            var winPoints=0;
            var chancePoints=0;
            check2(line);
            for( h=0 ; h < line.length ; h++ ) {
                if($("#"+line[h]).hasClass(turnClass)){
                winPoints++;
                }
                else{
                    winPoints=0;        
                }            
                if (winPoints==5){
                    $("#modalwrap").addClass( "win "+turnClass );
                    break;
                }
            }
            winPoints=0;    
        }

        // uloz 5 do pola a posli na kontrolu ci je mozna vyhra
        function check2(line) {
            var winPoints=0;
            var start = 0;
            var end = 5; 
            var sss = [];
            recur(line);    
            function recur(line) {
                for( h=start ; h < end ; h++ ) {    
                sss.push(line[h]);
            }
            check4(sss);
            sss=[];
            winPoints==0;        
        
            start++;
            end++;
            // ak nie som na konco rekurzivne volam metodu znova
            if(end<=line.length){recur(line);}
            }
        }

        // ak je vyhra mozna posli na oznacenie kde
        function check4(sss){
            var win=0;
            var win2=0;
            for( h=0 ; h < sss.length ; h++ ) {
                if($("#"+sss[h]).hasClass(turnClass) ){
                    win++;
                }
            }    
            if(win==4){
                check3(sss);
            }
        }

        // oznac vyhernu poziciu;
        function check3(sss){
            for( h=0 ; h < sss.length ; h++ ) {
                if(!$("#"+sss[h]).hasClass(turnClass)){
                    switchClass();
                if(!$("#"+sss[h]).hasClass(turnClass) ){
                    switchClass();
                    $("#"+sss[h]).addClass(turnClass+"op");
                    switchClass();
                }
                    switchClass();
                }    
            }
        }    


        // kontrola verticalnych a horzinotalnych
        function horizontalVerticalWin() { 
            var verPos = 0;
            var line=[];
            var line2=[];
            for(v=0 ; v < 10 ; v++) {
                verPos++;
                var horPos = 0;
                for( h=0 ; h < 10 ; h++ ) {
                    horPos++;
                    var item =verPos+"v-"+horPos+"h";
                    line.push(item); 
                    var item2 =horPos+"v-"+verPos+"h";
                    line2.push(item2);
                }
                check(line);
                line =[];
                check(line2);
                line2 =[];
            }
        }



        // kontrola diagonal z lava do prava
        function diagonalWin() { 
            var pocet = 10
            var nextLine = 0;
            var line=[];
            var line2=[];
            for( i=0 ; i < 6 ; i++ ) {
                var horPos = 0;
                var verPos = 0;
                verPos=nextLine;
                for(h=0 ; h < pocet ; h++) {
                    horPos++;
                    verPos++;
                    var item =verPos+"v-"+horPos+"h";
                    line.push(item);
                    var item2 =horPos+"v-"+verPos+"h";
                    line2.push(item2);
                }
                nextLine++;
                pocet--;
                check(line);
                line =[];
                check(line2);
                line2 =[];
            }
        }

        // kontrola diagonal z prava do lava dolna
        function diagonalWin3() { 
            var pocet = 10;
            var nextLine = 11;
            var line=[];
            for(i=0 ; i < 6 ; i++) {
                var horPos = 11;
                var verPos = 0;
                horPos=nextLine;
                for(h=0 ; h < pocet ; h++) {
                    horPos--;
                    verPos++;            
                    var item =verPos+"v-"+horPos+"h";
                    line.push(item);
                }
                nextLine--;
                pocet--;
                check(line);
                line =[];        
            }    
        }

        // kontrola diagonal z prava do lava horna
        function diagonalWin2() { 
            var pocet = 10;
            var nextLine = 0;
            var line=[];
            for(i=0 ; i < 6 ; i++) {
                var horPos = 11;
                var verPos = 0;
            verPos=nextLine;
            for(h=0 ; h < pocet ; h++) {
                    horPos--;
                    verPos++;
                    var item =verPos+"v-"+horPos+"h";
                    line.push(item); 
                }
                nextLine++;
                pocet--;
                check(line);
                line =[];    
            }
        }

   }
}( window.app = window.app || {}, jQuery ));
app.TicTacToe.init();