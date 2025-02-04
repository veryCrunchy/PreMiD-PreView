<template>
  <div class="blob-container">
    <!-- Core viewport blobs -->
    <div class="blob-stack -left-[20vw] -top-[20vh]">
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        class="blob-base"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color: #4e3ebb; stop-opacity: 0.9" />
            <stop
              offset="100%"
              style="stop-color: #7742fd; stop-opacity: 0.8"
            />
          </linearGradient>
        </defs>
        <path
          fill="url(#grad1)"
          d="M44.1,-37.3C54.4,-22.2,58.1,-4,52.3,8.2C46.5,20.4,31.2,26.6,16.6,33.1C2,39.6,-11.8,46.3,-29.6,44.3C-47.5,42.3,-69.4,31.6,-72.8,16.6C-76.2,1.6,-61.2,-17.6,-46,-33.8C-30.8,-50,-15.4,-63.2,0.8,-63.8C16.9,-64.4,33.8,-52.4,44.1,-37.3Z"
          transform="translate(100 100)"
        />
      </svg>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        class="blob-overlay"
      >
        <defs>
          <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color: #4e3ebb; stop-opacity: 0.9" />
            <stop
              offset="100%"
              style="stop-color: #7742fd; stop-opacity: 0.3"
            />
          </radialGradient>
        </defs>
        <path
          fill="url(#grad2)"
          d="M54.1,-42.6C66.2,-28,69.4,-5.7,66.1,17.6C62.8,40.9,53,65.3,35.4,73.9C17.8,82.5,-7.6,75.5,-29.4,63.8C-51.2,52.2,-69.4,36.1,-75.3,15.7C-81.1,-4.7,-74.5,-29.5,-59.9,-44.6C-45.3,-59.8,-22.7,-65.3,-0.8,-64.6C21,-64,42,-57.1,54.1,-42.6Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>

    <div class="blob-stack -right-[20vw] -top-[20vh]">
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        class="blob-base"
      >
        <defs>
          <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color: #4b7bf7; stop-opacity: 0.9" />
            <stop
              offset="100%"
              style="stop-color: #4e3ebb; stop-opacity: 0.8"
            />
          </linearGradient>
        </defs>
        <path
          fill="url(#grad5)"
          d="M48.2,-46.1C57.2,-39.2,55.7,-19.6,54.6,-1.1C53.5,17.4,52.8,34.8,43.8,44.3C34.8,53.9,17.4,55.5,0.9,54.7C-15.7,53.8,-31.4,50.4,-42.4,40.8C-53.4,31.4,-59.7,15.7,-58.6,1.1C-57.5,-13.5,-48.9,-27,-37.8,-33.9C-26.7,-40.8,-13.3,-41.2,3.1,-44.3C19.6,-47.4,39.2,-53.1,48.2,-46.1Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>

    <div class="blob-stack -left-[10vw] top-[30vh]">
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        class="blob-base"
      >
        <defs>
          <radialGradient id="grad6" cx="30%" cy="70%" r="70%">
            <stop offset="0%" style="stop-color: #7742fd; stop-opacity: 0.9" />
            <stop
              offset="100%"
              style="stop-color: #2a1141; stop-opacity: 0.3"
            />
          </radialGradient>
        </defs>
        <path
          fill="url(#grad6)"
          d="M33.5,-26.7C46.6,-16.7,62.4,-8.3,64.1,2.1C65.8,12.5,53.5,25,40.7,33.7C27.8,42.3,13.9,47.2,1.2,46C-11.5,44.8,-23,37.5,-33.7,28.9C-44.4,20.2,-54.3,10.1,-55.1,-0.8C-55.9,-11.7,-47.5,-23.3,-36.8,-33.3C-26,-43.3,-13,-51.7,-2.2,-49.5C8.7,-47.3,17.3,-34.7,33.5,-26.7Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>

    <div class="blob-stack -right-[12vw] top-[40vh]">
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        class="blob-base"
      >
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: #2a1141; stop-opacity: 0.8" />
            <stop
              offset="100%"
              style="stop-color: #4e3ebb; stop-opacity: 0.6"
            />
          </linearGradient>
        </defs>
        <path
          fill="url(#grad3)"
          d="M48.3,-64.6C56.7,-50.4,53.5,-29.7,57.4,-9.8C61.2,10,72.1,28.9,68.7,44.2C65.3,59.4,47.6,71,30.1,73.2C12.6,75.5,-4.9,68.6,-20.5,60.9C-36.1,53.3,-49.9,45,-59.7,32.4C-69.5,19.7,-75.3,2.7,-70.5,-10.3C-65.7,-23.3,-50.1,-32.3,-36.6,-45.5C-23.1,-58.7,-11.5,-76.1,4.2,-81.1C19.9,-86.1,39.8,-78.7,48.3,-64.6Z"
          transform="translate(100 100)"
        />
      </svg>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        class="blob-overlay"
      >
        <defs>
          <radialGradient id="grad4" cx="30%" cy="70%" r="70%">
            <stop offset="0%" style="stop-color: #7742fd; stop-opacity: 0.7" />
            <stop offset="100%" style="stop-color: #4b7bf7; stop-opacity: 0" />
          </radialGradient>
        </defs>
        <path
          fill="url(#grad4)"
          d="M33,-40.1C46.2,-35.9,62.6,-30.8,67.6,-20.7C72.6,-10.6,66.2,4.4,58.9,16.8C51.6,29.1,43.4,38.8,33.5,50.1C23.5,61.3,11.8,74,-3.1,78.3C-18,82.6,-36,78.5,-45.9,67.2C-55.8,56,-57.6,37.6,-58.4,22.1C-59.3,6.5,-59.2,-6.4,-56.7,-19.8C-54.2,-33.2,-49.4,-47.2,-39.5,-52.5C-29.7,-57.8,-14.8,-54.4,-2.4,-51C9.9,-47.7,19.9,-44.3,33,-40.1Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
  .blob-container {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    min-height: 100vh;
    overflow: hidden;
    pointer-events: none;
    z-index: -1;
  }

  .blob-stack {
    position: absolute; /* Changed from fixed */
    width: 60vmax;
    height: 60vmax;
    filter: blur(40px);
    mix-blend-mode: lighten;
    opacity: 0.75;
    transform-origin: center;
  }

  .blob-base,
  .blob-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    animation: float 30s infinite ease-in-out;
  }

  .blob-overlay {
    mix-blend-mode: screen;
    transform: scale(1.05) translate(5%, 5%);
    animation: float-overlay 35s infinite ease-in-out;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(1%, 1%) rotate(30deg);
    }
    66% {
      transform: translate(-1%, 0.5%) rotate(60deg);
    }
  }

  @keyframes float-overlay {
    0%,
    100% {
      transform: scale(1.05) translate(5%, 5%) rotate(0deg);
    }
    33% {
      transform: scale(1.07) translate(4%, 6%) rotate(-30deg);
    }
    66% {
      transform: scale(1.03) translate(6%, 4%) rotate(-60deg);
    }
  }

  @keyframes blob-drift {
    0% {
      transform: translateY(0) scale(1);
    }
    100% {
      transform: translateY(2vh) scale(1.02);
    }
  }

  .blob-stack:nth-child(1) {
    animation-duration: 50s;
  }
  .blob-stack:nth-child(2) {
    animation-duration: 65s;
    animation-delay: -20s;
  }
  .blob-stack:nth-child(3) {
    animation-duration: 55s;
    animation-delay: -15s;
  }
  .blob-stack:nth-child(4) {
    animation-duration: 70s;
    animation-delay: -30s;
  }
  .blob-stack:nth-child(5) {
    animation-duration: 45s;
    animation-delay: -10s;
  }
</style>
