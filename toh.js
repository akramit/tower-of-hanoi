let gameState = {
            1: ['large', 'small'], // Rod 1 starts with both disks (large at bottom, small at top)
            2: [], // Rod 2 is empty
            3: []  // Rod 3 is empty
        };

        // Initialize the game
        function initGame() {
            renderGame();
        }

        // Render the current game state
        function renderGame() {
            // Clear all rods
            for (let i = 1; i <= 3; i++) {
                const rod = document.getElementById(`rod${i}`);
                // Remove existing disks but keep rod structure
                const disks = rod.querySelectorAll('.disk');
                disks.forEach(disk => disk.remove());
            }

            // Add disks to their respective rods
            for (let rodNum = 1; rodNum <= 3; rodNum++) {
                const rod = document.getElementById(`rod${rodNum}`);
                const disksOnRod = gameState[rodNum];
                
                disksOnRod.forEach(diskSize => {
                    const disk = document.createElement('div');
                    disk.className = `disk disk-${diskSize}`;
                    rod.appendChild(disk);
                });
            }
        }

        // Move disk function
        function moveDisk() {
            const fromRod = parseInt(document.getElementById('fromRod').value);
            const toRod = parseInt(document.getElementById('toRod').value);
            const messageDiv = document.getElementById('message');

            // Clear previous messages
            messageDiv.style.display = 'none';
            messageDiv.className = 'message';

            // Validate move
            if (fromRod === toRod) {
                showMessage('Cannot move to the same rod!', 'error');
                return;
            }

            // Check if source rod has any disks
            if (gameState[fromRod].length === 0) {
                showMessage(`Rod ${fromRod} is empty!`, 'error');
                return;
            }

            // Get the top disk from source rod
            const diskToMove = gameState[fromRod][gameState[fromRod].length - 1];
            
            // Check if move is valid (can't place larger disk on smaller disk)
            if (gameState[toRod].length > 0) {
                const topDiskOnTarget = gameState[toRod][gameState[toRod].length - 1];
                if (diskToMove === 'large' && topDiskOnTarget === 'small') {
                    showMessage('Cannot place a larger disk on a smaller disk!', 'error');
                    return;
                }
            }

            // Perform the move
            gameState[fromRod].pop();
            gameState[toRod].push(diskToMove);

            // Add animation effect
            const targetRod = document.getElementById(`rod${toRod}`);
            setTimeout(() => {
                renderGame();
                const movedDisk = targetRod.lastElementChild;
                if (movedDisk && movedDisk.classList.contains('disk')) {
                    movedDisk.classList.add('moving');
                    setTimeout(() => {
                        movedDisk.classList.remove('moving');
                    }, 600);
                }
            }, 100);

            showMessage(`Moved ${diskToMove} disk from Rod ${fromRod} to Rod ${toRod}`, 'success');

            // Check for win condition (all disks on rod 2 or 3)
            if (gameState[2].length === 2 || gameState[3].length === 2) {
                setTimeout(() => {
                    showMessage('🎉 Congratulations! You solved the puzzle!', 'success');
                }, 700);
            }
        }

        // Show message function
        function showMessage(text, type) {
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = text;
            messageDiv.className = `message ${type}`;
            messageDiv.style.display = 'block';
            
            // Auto-hide success messages after 3 seconds
            if (type === 'success') {
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 3000);
            }
        }

        // Add keyboard support
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                moveDisk();
            }
        });

        // Initialize the game when page loads
        window.onload = initGame;