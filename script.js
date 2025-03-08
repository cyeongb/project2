window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
    
    const sections = document.querySelectorAll('section');
    const content = document.querySelector('.content');
    const sectionContents = document.querySelectorAll('.section-content');
    
    // Banner content animation
    if (isInViewport(sections[0])) {
        content.classList.add('active');
    } else {
        content.classList.remove('active');
    }
    
    // Section content animations
    sectionContents.forEach((sectionContent, index) => {
        if (isInViewport(sections[index + 1])) {
            sectionContent.classList.add('active');
        } else {
            sectionContent.classList.remove('active');
        }
    });
});

// Navigation smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) / 1.3 &&
        rect.bottom >= 0
    );
}

// Add active class to content on page load
window.addEventListener('load', function() {
    const content = document.querySelector('.content');
    content.classList.add('active');
});
// 서브영상

 // YouTube 플레이어 변수
 let player;

 // YouTube API가 준비되면 실행
 function onYouTubeIframeAPIReady() {
     player = new YT.Player('player', {
         videoId: 'vRok4bfaKCc', // 유튜브 영상 ID
         playerVars: {
             autoplay: 1,
             loop: 1,
             playlist: 'vRok4bfaKCc', // 반복 재생을 위해 동일한 영상 ID
             controls: 0,
             showinfo: 0,
             rel: 0,
             iv_load_policy: 3,
             modestbranding: 1,
             disablekb: 1,
             playlist:'vRok4bfaKCc',
             mute: 1 // 자동 재생을 위해 음소거 필요
         },
         events: {
             'onReady': onPlayerReady,
             'onStateChange': onPlayerStateChange
         }
     });
 }

 // 플레이어가 준비되면 실행
 function onPlayerReady(event) {
     event.target.playVideo();
     // 비디오 크기 조정
     resizeVideo();
     // 창 크기가 변경될 때 비디오 크기 조정
     window.addEventListener('resize', resizeVideo);
 }

 // 플레이어 상태 변경 시 실행
 function onPlayerStateChange(event) {
     // 영상이 끝나면 다시 재생
     if (event.data === YT.PlayerState.ENDED) {
        console.log("끝나고 다시 재생??");
        player.playVideo();
        console.log("끝나고 다시 재생 된다");
     }
 }

 // 비디오 크기 조정
 function resizeVideo() {
     const width = window.innerWidth;
     const height = window.innerHeight;
     const aspectRatio = 16 / 9;

     let newWidth, newHeight;

     if (width / height > aspectRatio) {
         newWidth = width;
         newHeight = width / aspectRatio;
     } else {
         newWidth = height * aspectRatio;
         newHeight = height;
     }

     if (player && player.setSize) {
         player.setSize(newWidth, newHeight);
     }
 }

 // 스크롤 이벤트 처리
 window.addEventListener('scroll', function() {
     const contentBox = document.querySelector('.content-box');
     const contentSection = document.querySelector('.content-section');
     const overlay = document.querySelector('.overlay');
     
     // 콘텐츠 섹션의 위치 정보
     const contentRect = contentSection.getBoundingClientRect();
     
     // 콘텐츠가 화면에 들어오면 애니메이션 활성화
     if (contentRect.top < window.innerHeight * 0.7) {
         contentBox.classList.add('visible');
         overlay.classList.add('dark');
     } else {
         contentBox.classList.remove('visible');
         overlay.classList.remove('dark');
     }
 });



// 지도 ==========================================================
  // 네이버 지도 초기화
  var mapOptions = {
    center: new naver.maps.LatLng(35.1795543, 128.1076769), // 진주시 중심 좌표
    zoom: 12,
    zoomControl: true,
    zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT
    }
};

var map = new naver.maps.Map('map', mapOptions);

// 진주시 중심에 마커 생성
var marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(35.1795543, 128.1076769),
    map: map,
    title: '진주시'
});

// 반응형 지도 크기 조정
window.addEventListener('resize', function() {
    map.setSize(new naver.maps.Size(window.innerWidth, window.innerHeight));
});