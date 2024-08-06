let currentFloor = 1;
    let targetFloor = 1;
    let isMoving = false;
    let doorsOpen = false;
    let elevator = document.getElementById('elevator');
    let monitor = document.getElementById('monitor');
    let elevatorHeight = 50; // Height of the elevator in pixels
    let floors = 8;
    let shaftHeight = 400; // Height of the elevator shaft in pixels

    function goToFloor(floor) {
      if (isMoving || doorsOpen) return;
      targetFloor = floor;
      highlightButton(floor);
      isMoving = true;
      let distance = Math.abs(currentFloor - floor);
      let duration = distance * 1000; // Assuming 1 second per floor
      let stepDuration = 1000; // 1 second per step
      let steps = Array.from({length: distance}, (_, i) => currentFloor + (floor > currentFloor ? i + 1 : -i - 1));

      elevator.style.transition = `bottom ${duration / 1000}s`;
      elevator.style.bottom = `${(floor - 1) * (shaftHeight / floors)}px`;

      steps.forEach((step, index) => {
        setTimeout(() => {
          monitor.innerText = step;
        }, index * stepDuration);
      });

      setTimeout(() => {
        currentFloor = floor;
        isMoving = false;
        console.log(`Elevator has arrived at floor ${floor}`);
        highlightButton(floor);
        openDoors();
      }, duration);
    }

    function openDoors() {
      if (isMoving) return;
      doorsOpen = true;
      elevator.style.backgroundColor = 'green';
      elevator.innerText = 'Open';
      setTimeout(() => {
        closeDoors();
      }, 3000);
    }

    function closeDoors() {
      doorsOpen = false;
      elevator.style.backgroundColor = 'red';
      elevator.innerText = 'Closed';
    }

   

    function highlightButton(floor) {
      for (let i = 1; i <= floors; i++) {
        document.getElementById(`floor-${i}`).classList.remove('active');
      }
      document.getElementById(`floor-${floor}`).classList.add('active');
    }

    // Initial highlight for the first floor and update monitor
    highlightButton(currentFloor);
    monitor.innerText = currentFloor;