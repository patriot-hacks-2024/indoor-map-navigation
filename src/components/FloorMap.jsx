import {useEffect, useRef} from "react";
import {stair} from "../data/mapData";

const FloorMap = ({name, grid, start, targetRoom, updateSelectedStairCallback, refresh, changeFloorCallback}) => {
    const canvasRef = useRef(null);
    const stairs = stair;

    let shouldCallback = true;

    useEffect(() => {
        console.log("drawing");
        let ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        drawGrid(grid, ctx);
        if (targetRoom !== null) {
            let navToOtherFloors = targetRoom.floor !== name;
            console.log("targetRoom", targetRoom.entrance)
            let goals = navToOtherFloors ? stairs : [targetRoom.entrance];
            let path = dijkstra(grid, start, goals);
            if (path.length > 1) {
                drawPath(path, ctx, () => {
                    if (navToOtherFloors && shouldCallback) {
                        shouldCallback = false;
                        setTimeout(() => {
                            updateSelectedStairCallback(nextStart);
                            changeFloorCallback(targetRoom.floor);
                        }, 1200);
                    }
                });
            }
        }
    }, [targetRoom, refresh]);

    return (
        <canvas ref={canvasRef} width="600" height="300"
                style={{marginBottom: '10px'}}></canvas>
    )
};


const drawGrid = (grid, ctx) => {
    const rows = 50;
    const cols = 100;

    const cellSize = 7; // 每个格子的大小
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 8) {
                ctx.fillStyle = '#39393A'
            } else if (grid[i][j] === 7) {
                ctx.fillStyle = '#2274A5'
            } else if (grid[i][j] === 6) {
                ctx.fillStyle = '#32936F'
            } else if (grid[i][j] === 5) {
                ctx.fillStyle = '#E83F6F'
            } else if (grid[i][j] === 2) {
                ctx.fillStyle = 'gray'
            } else if (grid[i][j] === 1) {
                ctx.fillStyle = '#FFBF00'
            } else if (grid[i][j] === 0) {
                ctx.fillStyle = '#FFFFFF'
            } else {
                continue
            }
            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize); // 绘制格子边框
        }
    }
};

let nextStart = []

const dijkstra = (grid, start, goal) => {
    if (start === null) {
        return [];
    }
    start = [start[0], start[1]]
    console.log("dijk", start, goal);

    if (goal.length === 0) {
        return [];
    }

    const rows = grid.length;
    const cols = grid[0].length;
    const visited = new Set();
    const queue = [{cost: 0, position: start, path: [start]}]; // 记录成本、当前位置和路径

    while (queue.length > 0) {
        queue.sort((a, b) => a.cost - b.cost); // 按成本升序排序
        const {cost, position, path} = queue.shift();
        const x = position[0];
        const y = position[1];

        for (let i = 0; i < goal.length; i++) {
            if (position[0] === goal[i][0] && position[1] === goal[i][1]) {
                nextStart = [position[0], position[1]]
                return path; // 返回路径
            }
        }

        if (visited.has(`${x},${y}`)) continue; // 如果已访问，则跳过

        visited.add(`${x},${y}`);

        const directions = [
            [0, 1], [1, 0], [0, -1], [-1, 0], // 四个方向
        ];

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < rows && ny < cols && grid[nx][ny] === 0) {
                queue.push({cost: cost + 1, position: [nx, ny], path: [...path, [nx, ny]]});
            }
        }
    }
    return []; // 找不到路径
};

const drawPath = (path, ctx, callback) => {
    console.log(path);

    let index = 0;

    // 定义逐步绘制的函数
    const step = () => {
        if (index < path.length) {
            const x = path[index][0];
            const y = path[index][1];
            ctx.fillStyle = 'red'; // 路径为红色
            ctx.fillRect(y * 5 + 1, x * 5 + 1, 3, 3); // 绘制路径
            index++;
            setTimeout(step, 21); // 每500毫秒绘制下一个点
        } else {
            callback();
        }
    };

    step(); // 开始绘制
};

export default FloorMap;