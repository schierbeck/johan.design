$(document).ready(function () {

	song.loop = true;
	song.volume = 0.8;
	responsiveVoice.speak("Tryck på knappen för att spela.", lang);

	$('button').click(function() {
		$(this).addClass('hide');
		song.play();
		
		if( $('#easy').is(':checked') ) {
     	words = ['mus', 'bok', 'apa', 'se', 'ko', 'hej', 'kul', 'bus', 'fot', 'ål', 'val', 'jag', 'hon', 'han', 'arm', 'äta', 'le', 'tåg'];
		} else if( $('#medium').is(':checked') ) {
			words = ['dansa', 'fågel', 'svans', 'kram', 'pasta', 'springa', 'hoppa', 'banan', 'baka', 'såga', 'spika', 'köra', 'kniv', 'åsna', 'häst', 'varg', 'häxa'];
		} else if( $('#hard').is(':checked') ) {
			words = ['skratta', 'vrida', 'skidor', 'gaffel', 'tallrik', 'fågel', 'lejon', 'tiger', 'drake', 'skelett', 'varulv', 'vampyr', 'spöke', 'simma', 'springa'];
		}

		shuffle(words);
		// Amount of words per play
		words.length = 5;
		printWord();
	});
	

	function printWord() {
		$('.levels').hide();
		$('.word').html('');

		// Randomly choose word from array
		word = Math.floor( Math.random() * words.length );
		current_word = words[word];
		// Split choosen word into letter array
		split_word = words[word].split('');
		// Print letters as span's 
		for(var i=0; i < words[word].length; i++) {
			if(i === 0) {
				$('.word').append	('<span class="active">'+split_word[i]+'</span>');
			} else {
				$('.word').append	('<span>'+split_word[i]+'</span>');
			}
		}
		// Delete word from array
		words.splice(word, 1);
	}


	$(document).keypress(function(e){

		var active_letter = $('span.active');
		var active_text = active_letter.text();

	  if ( String.fromCharCode(e.which) == active_text.toLowerCase() ) {

	  	if( $('.word span').last().prev().hasClass('done') ) {

	  		responsiveVoice.speak(active_text.toLowerCase(), lang);

	  		setTimeout(function () {
	  			responsiveVoice.speak(current_word.toLowerCase(), lang);
	  		}, 1000);

	  		if (words.length) {
	  			setTimeout(function () {
	  				printWord();	
	  			}, 3000);	
	  		} else {
	  			// Nästa level?
	  			setTimeout(function () {
	  				responsiveVoice.speak("Bra jobbat. Du klarade banaan!", lang);
	  			}, 3000);
	  			setTimeout(function () {
	  				$('button').removeClass('hide');
	  				$('.levels').show();
	  				$('.word').html('');
	  				responsiveVoice.speak("Tryck på knappen för att spela igen.", lang);
	  			}, 6000);	
	  		}
	  		
	  		
	  	} else {
	  		responsiveVoice.speak(active_text.toLowerCase(), lang);
	  		active_letter.next().addClass('active');
	  	}

	  	active_letter.addClass('done');
	  	active_letter.removeClass('active');  	


	  	$('.character').css('background-image', 'url(catboy.png)');
	  	$('.character').addClass('show');

	  	setTimeout(function () {
	  		$('.character').removeClass('show');
	  	}, 1000);

	  	$('body').addClass('correct');
	  	coin.play();

	  	setTimeout(function() {
	  		$('body').removeClass('correct');
	  	}, 1000);
	  	
	  	
	  } else {
	  	$('body').addClass('false');
	  	fail.play();

	  	$('.character').css('background-image', 'url(minininja.png)');
	  	$('.character').addClass('show');

	  	setTimeout(function () {
	  		$('.character').removeClass('show');
	  	}, 1000);

	  	setTimeout(function() {
	  		$('body').removeClass('false');
	  	}, 400);
	  }
	});

});