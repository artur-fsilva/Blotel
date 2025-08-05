
document.addEventListener('DOMContentLoaded', function() {
    const carrosseu = document.getElementById('carroseu');
    if (!carrosseu) return;
   
    const mainImg = carrosseu.getElementsByTagName('img')[0];
    const thumbs = carrosseu.querySelectorAll('div > img');
    const act = carrosseu.getElementsByClassName('act');

   
   
    mainImg.src = act[0].src;
        
    

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            
            mainImg.src = this.src;
            
            thumbs.forEach(t => t.classList.remove('act'));
            
            this.classList.add('act');
        });
    });
});
