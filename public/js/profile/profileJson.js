

$(function(){

    function loadRates() {
        var id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
        $.getJSON('http://pri.me/api/profiles/'+id)
        
        .done (function(data){
            var name = "";
            var city = "";
            var stars ="";
            var phone ="";
            var phoneShow = "";
            var email ="";
            var emailShow = "";
            var facebook ="";
            var instagram ="";
            var page ="";
            var reviews = "";
            var description = "";
            var certificates = "";
            var education = "";
            var offert = "";
            var photos = "";
            var profilePic = "";
            var disciplines = '<p style="margin-top: 25px;"><b>Dyscypliny: </b></p>';
            $.each(data, function(index, element) {
                console.log(element)
                //gwiazdki
                for( var j = 0; j <Math.round(element.rating) ; j++ ){
                  stars += '<span class="fa fa-star green-star-checked"></span>';
                }
                for(var k = 0; k < (5-Math.round(element.rating)); k++){
                  stars += '<span class="fa fa-star green-star"></span>';
                }
                stars +="<span class='rating-info'><i>("+Math.round(element.rating)+"/5)</i></span>";

                //imię + nazwisko
                if(element.name && element.surname){
                    name+= element.name +" "+element.surname;
                }else{
                    name+= "Brak danych"
                }
                //miasto + województwo
                if(element.tr_loc.length != 0){
                    $.each(element.tr_loc,function(ind,ele){
                        city+="<i class='fas fa-map-marker-alt'></i>" +ele.city+ ", "+ele.voivodeship+"</br>";
                    });
                }else{
                    city+= "Brak danych"
                }
                //telefon
                if(element.phone){
                    phoneShow = element.phone
                    phone+= element.phone.toString().substring(0,3) + "  <span class='show-number'><u>Pokaż</u></span>"
                }else{
                    phone+= "Brak danych"
                }
                //email
                if(element.email){
                    emailShow = element.email
                    email+= element.email.substring(0,3)+ "  <span class='show-mail'><u>Pokaż</u></span>";
                }else{
                    email+= "Brak danych"
                }
                //facebook
                if(element.facebook){
                    facebook+= "<a href='https://facebook.com/"+element.facebook+"' target='_blank'>Zobacz profil</a>";
                }else{
                    facebook += "Brak danych";
                }
                //instagram
                if(element.instagram){
                    instagram+= "<a href='https://instagram.com/"+element.instagram+"' target='_blank'>Zobacz profil</a>";;
                }else{
                    instagram += "Brak danych";
                }

                //web_page
                if(element.page){
                    page+= "<a href=https://"+element.page+" target='_blank'>Przejdź na stronę</a>";;
                }else{
                    page += "Brak danych";
                }


                for(var i = 0 ; i < element.tr_disc.length; i++){
                    if(element.tr_disc[i].discipline_name){
                        disciplines += '<p><i class="fas fa-check-square"></i>'+element.tr_disc[i].discipline_name+'</p>'
                    }
                }

                console.log(element)
                //Doświadczenie i umiejętności
                if(element.description){
                    description+= element.description;
                }else{
                    description += "Brak danych";
                }
                // certyfikaty
                $.each(element.tr_cert, function(ind,ele){
                    if(ele.name_of_institution){
                        certificates+= "<p>"+ele.name_of_institution+ " - ";
                    }
                    if(ele.name_of_course){
                        certificates+= ele.name_of_course+ " - ";
                    }
                    if(ele.begin_date){
                        certificates+=" :  "+(ele.begin_date);
                    }
                    if(ele.end_date){
                        certificates+= " - "+(ele.end_date);
                    }
                    if(ele.zalacznik){
                        certificates+= " - <a href='\/storage\/trainers_certificates\/"+(ele.trainer_id)+"\/"+(ele.zalacznik)+"' target='_blank'>Zobacz</a></p>";
                    }
                });

                // Wykształcenie
                $.each(element.tr_uni, function(ind,ele){
                    if(ele.university){
                        education+= "<p>"+ele.university+ " - ";
                    }
                    if(ele.course){
                        education+= ele.course;
                    }
                    if(ele.degree){
                        education+=" -  "+(ele.degree);
                    }
                    if(ele.begin_date){
                        education+= " - "+(ele.begin_date);
                    }
                    if(ele.end_date){
                        education+= " : "+(ele.end_date)+ "</p>";
                    }
                });
                // $.each(element.tr_pl,function(ind,ele){

                //     description+= "</br> </br> Lokaliacja : "+ele.place;
                // });

                // Cennik
                $.each(element.tr_off,function(ind,ele){
                    offert+= "<tr><td>"+ele.name+"</td><td> "+ele.max_no_of_clients+" os.</td><td>"+ele.price+" zł</td>";
                    
                });

                //Opinie
                $.each(element.tr_op,function(ind,ele){
                    var array = ele.created_at.split(' ');

                    reviews += "<div class='review-header'>";
                    reviews += "<span class='review-header-name'>"+ele.name+" " +"<span class='date-review'>"+array[0]+"</span>"+"</span>";
                    reviews += "<span class='review-header-rating'>";
                    reviews +="<span class='rating-info'><i>("+ele.rating+"/5)</i></span>";
                    for( var j = 0; j < ele.rating ; j++ ){
                        reviews += '<span class="fa fa-star green-star-checked"></span>';
                      }
                      for(var k = 0; k < (5-ele.rating); k++){
                        reviews += '<span class="fa fa-star dark-star"></span>';
                      }

                    reviews += "</span></div><div class='review-content'>";
                    reviews += ele.description;
                    reviews += "</div>";
                });

                //Galeria
                $.each(element.tr_ph,function(ind,ele){
                    if(ele.only_for_avatar == "NO"){
                        photos += "<div class='gallery-photo'><div><a href=\"";
                        photos += "\/storage/trainers_photos\/"+element.id+"\/"+ ele.photo_name+"\" data-lightbox=\"my-gallery\" >"
                        photos += " <img src=\"\/storage/trainers_photos\/"+element.id+"\/";
                        photos += ele.photo_name+"\" \/></a></div></div>"
                    }
                });

                if(element.avatar){
                    $.each(element.tr_ph,function(ind,ele){
                        if(ele.id === parseInt(element.avatar)){
                            profilePic += " <img src=\"\/storage/trainers_photos\/"+element.id+"\/";
                            profilePic += ele.photo_name+"\" \/>"
                        }
                    });
                }
             });
           // $(".categories:eq(2)").html(offert);  <img src="/storage/trainers_photos/8/picture2_1541352187.jpg"/>
           // $(".categories:eq(4)").prepend(reviews);
            //$(".detail-list").html(msg);
            //$(".categories:first").html(description);
            $(".stars-info").html(stars);
            $("#name-info").text(name);
            $("#city-info").html(city);
            $("#phone-info").html(phone);
            $("#mail-info").html(email);
            $("#fb-info").html(facebook);
            $("#inst-info").html(instagram);
            $("#page-info").html(page);
            $(".categories-content:eq(0)").text(description);
            $(".categories-content:eq(0)").append(disciplines);
            $(".categories-content:eq(1)").html(certificates);
            $(".categories-content:eq(2)").html(education);
            $(".gallery-content").html(photos);
            // $(".categories-content:eq(5)").prepend(reviews);
            $(".categories-content:eq(7)").prepend(reviews);
            $("#price-table").append(offert);
            $(".profilePic").html(profilePic);
            if(document.getElementsByClassName('show-number')[0]){
                document.getElementsByClassName('show-number')[0].addEventListener('click', () => {
                    document.getElementById('phone-info').textContent = phoneShow;
                })
            }
            if(document.getElementsByClassName('show-mail')[0]){
                document.getElementsByClassName('show-mail')[0].addEventListener('click', () => {
                    document.getElementById('mail-info').textContent = emailShow;
                })
            }
        });    
        
        
        }
        
        loadRates();
        





})



//logo
if(document.getElementsByClassName('logo')){
    document.getElementsByClassName('logo')[0].addEventListener('click',function(){
        location.href = "//pri.me";
    },false)
  }

