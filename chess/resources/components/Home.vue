<script>
    export default {
        data() {
            return {
                selectedCell: null,
                board: [],
                pieces: {
                    'A8': '♜', 'B8': '♞', 'C8': '♝', 'D8': '♛', 'E8': '♚', 'F8': '♝', 'G8': '♞', 'H8': '♜',
                    'A7': '♟', 'B7': '♟', 'C7': '♟', 'D7': '♟', 'E7': '♟', 'F7': '♟', 'G7': '♟', 'H7': '♟',
                    'A2': '♙', 'B2': '♙', 'C2': '♙', 'D2': '♙', 'E2': '♙', 'F2': '♙', 'G2': '♙', 'H2': '♙',
                    'A1': '♖', 'B1': '♘', 'C1': '♗', 'D1': '♕', 'E1': '♔', 'F1': '♗', 'G1': '♘', 'H1': '♖'
                },
                draggedPiece: null,
                past: []
        }
    },
            
    mounted() {
        this.generateBoard();
    },
            
    methods: {
        drop(e) {
            e.preventDefault();
            const fromPosition = e.dataTransfer.getData('fromPosition');
            const piece = e.dataTransfer.getData('piece');
            
            // Megkeressük a célpozíciót
            let toPosition = null;
            let target = e.target;
            
            // Felfelé keresünk a DOM-ban, amíg meg nem találjuk a cell elemet
            while (target && !target.classList.contains('cell')) {
                target = target.parentElement;
            }
            
            if (target && target.dataset.position) {
                toPosition = target.dataset.position;
            }
            
            console.log('Drop event:', { fromPosition, toPosition, piece });
            
            if (fromPosition && toPosition && piece && fromPosition !== toPosition) {
                // Reaktív módon frissítjük a pieces objektumot
                this.pieces[toPosition] = piece;
                delete this.pieces[fromPosition];
                this.draggedTo = toPosition;
                this.past.push(`${piece} lépet a ${fromPosition} mezőről a ${toPosition} mezőre.`)
            }
        },
        
        dragEnd(e) {
            console.log('Drag ended');
            this.draggedFrom = null;
            this.draggedPiece = null;
        },
        dragStart(e, position) {
            console.log('Drag start from:', position);
            this.draggedFrom = position;
            this.draggedPiece = this.pieces[position];
            e.dataTransfer.setData('fromPosition', position);
            e.dataTransfer.setData('piece', this.pieces[position]);
            e.dataTransfer.effectAllowed = 'move';
        },
        allowDrop(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        },
        generateBoard() {
            const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
            const rows = [8, 7, 6, 5, 4, 3, 2, 1]; 
                    
            this.board = [];
                    
            for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
                for (let colIndex = 0; colIndex < 8; colIndex++) {
                    const position = columns[colIndex] + rows[rowIndex];
                    const isLight = (rowIndex + colIndex) % 2 === 0;
                            
                    this.board.push({
                        position: position,
                        color: isLight ? 'light' : 'dark',
                        row: rows[rowIndex],
                        column: columns[colIndex]
                    });
                }
            }
        },
                
        selectCell(position) {
            this.selectedCell = this.selectedCell === position ? null : position;
        }
    }
    }
</script>
<template>
    <div class="grid">
    <div class="chessboard">
        <div 
            v-for="(cell, index) in board" 
            :key="cell.position"
            :class="['cell', cell.color, { selected: selectedCell === cell.position }]"
            :data-position="cell.position"
            @click="selectCell(cell.position)"
            @dragover.prevent="allowDrop"
            @drop="drop"
        >
                <span class="coordinates">{{ cell.position }}</span>
                <div  
                    v-if="pieces[cell.position]"
                    class="piece"
                    draggable="true"
                    @dragstart="dragStart($event, cell.position)"
                    @dragend="dragEnd"
                >
                    {{ pieces[cell.position] }}
                </div >
        </div>
    </div>
    <div class="info2">
        <h3>Játék információk</h3>
        <div v-for="(move, index) in past">{{move}}</div>
    </div>
        <div class="info">
        <p v-if="selectedCell">Kiválasztott mező: {{ selectedCell }}</p>
        <p v-else>Kattintson egy mezőre a kiválasztásához</p>
    </div>
    </div>

            

</template>
 <style>
        .grid {
            display: grid;
            grid-template-areas: "chessboard chessboard info2" "info info info";
            grid-template-columns: 1fr 3fr;
            grid-template-columns: 1fr 1fr 1fr;
        }
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        
        .chessboard {
            display: grid;
            grid-area: chessboard;
            grid-template-columns: repeat(8, 6em);
            grid-template-rows: repeat(8, 6em);
            border: 0.4em solid #8B4513;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .cell {
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1em;
            color: #333;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
        }
        
        .cell:hover {
            transform: scale(1.05);
            z-index: 1;
        }
        
        .light {
            background-color: #f0d9b5;
        }
        
        .dark {
            background-color: #b58863;
        }
        
        .light:hover {
            background-color: #f5e6d0;
        }
        
        .dark:hover {
            background-color: #c09970;
        }
        
        .selected {
            box-shadow: inset 0 0 0 3px #6bff77;
        }
        
        
        .info {
            grid-area: info;
            text-align: center;
            color: #666;
            background-color: antiquewhite;
        }
        .info2 {
            grid-area: info2;
            text-align: center;
            color: #666;
            background-color: antiquewhite;
        }
        .piece{
            font-size: 4em;
            cursor: grab;
            position: absolute;
            z-index: 2;
        }
        .coordinates {
            position: absolute;
            top: 0.3em;
            left: 0.3em;
            font-size: 1em;
            opacity: 0.7;
        }
    </style>