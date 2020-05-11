let base64Image;
let modal = document.getElementById('result');

        //Get the image

        $('#image-selector').change(function() {
            let reader = new FileReader();
            reader.onload = function(e) {
                let dataURL = reader.result;
                $('#selected-image').attr('src', dataURL);
                $('#result-image').attr('src', dataURL);
                base64Image = dataURL.replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,', '');
                console.log(base64Image);
            }
            reader.readAsDataURL($('#image-selector')[0].files[0]);
        });

        //Send the picture to the backend and show top5 results in desired form.

        $('#predict-button').click(function() {
            let message = {
                image: base64Image
            }
            
            modal.style.display = 'block';
            console.log(message);
            $.post('http://localhost:5000/predict', JSON.stringify(message),
            function(response) {
                let j = 0;
                let top5 = response.map(function (p, i) {
                    return {
                        propability: p,
                        className: ACT_CLASSES[i]
                    };
                    }).sort(function (a, b) {
                        return b.propability - a.propability;
                    }).slice(0, 5);
                    $('#prediction-list').empty();
                    top5.forEach(function (p) {
                        j++;
                        $('#prediction-list').append(`<li> ${j}. ${p.className}: ${(100 * (p.propability)).toFixed(2)} %</li>`);
                    });

                    //Get the image of the actor who the user looks like the most
                    $('#result-act-image').attr('src', function() {
                        let imgSrc = '';
                        if(top5[0].className == ACT_CLASSES[0]) {
                            imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Brad_Pitt_PF.jpg/780px-Brad_Pitt_PF.jpg';
                        }
                        if(top5[0].className == ACT_CLASSES[1]) {
                            imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Clint_Eastwood_at_2010_New_York_Film_Festival.jpg/660px-Clint_Eastwood_at_2010_New_York_Film_Festival.jpg';
                        }
                        if(top5[0].className == ACT_CLASSES[2]) {
                            imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Halle_Berry_by_Gage_Skidmore_2.jpg/660px-Halle_Berry_by_Gage_Skidmore_2.jpg';
                        }
                        if(top5[0].className == ACT_CLASSES[3]) {
                            imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/1/13/JudiDenchFeb07.jpg';
                        }
                        if(top5[0].className == ACT_CLASSES[4]) {
                            imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Julia_Roberts_2011_Shankbone_3.JPG/597px-Julia_Roberts_2011_Shankbone_3.JPG';
                        }
                        if(top5[0].className == ACT_CLASSES[5]) {
                            imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Leonardo_DiCaprio_June_2014.jpg/405px-Leonardo_DiCaprio_June_2014.jpg';
                        }
                        if(top5[0].className == ACT_CLASSES[6]) {
                            imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Marilyn_Monroe_in_1952_TFA.jpg/600px-Marilyn_Monroe_in_1952_TFA.jpg';
                        }
                        if(top5[0].className == ACT_CLASSES[7]) {
                            imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Meryl_Streep_December_2018.jpg/651px-Meryl_Streep_December_2018.jpg';
                        }
                        if(top5[0].className == ACT_CLASSES[8]) {
                            imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Nicolas_Cage_-_66%C3%A8me_Festival_de_Venise_%28Mostra%29.jpg/330px-Nicolas_Cage_-_66%C3%A8me_Festival_de_Venise_%28Mostra%29.jpg';
                        }
                        if(top5[0].className == ACT_CLASSES[9]) {
                            imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Nicole_Kidman_-_Berlin_2015.png';
                        }
                        if(top5[0].className == ACT_CLASSES[10]) {
                            imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Flickr_-_nicogenin_-_66%C3%A8me_Festival_de_Venise_%28Mostra%29_-_Sylvester_Stallone_%2826%29.jpg/399px-Flickr_-_nicogenin_-_66%C3%A8me_Festival_de_Venise_%28Mostra%29_-_Sylvester_Stallone_%2826%29.jpg';
                        }
                        if(top5[0].className == ACT_CLASSES[11]) {
                            imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Will_Smith_by_Gage_Skidmore.jpg/597px-Will_Smith_by_Gage_Skidmore.jpg';
                        }
                        return imgSrc;
                    });

                    console.log(top5);
            });
            
        });

        $('#close').click(function() {
            modal.style.display = 'none';
        });