const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('start-screen');
const shopScreen = document.getElementById('shop-screen');
const shopBtnHUD = document.getElementById('shop-btn');
const gameoverScreen = document.getElementById('gameover-screen');
const closeShopBtn = document.getElementById('close-shop-btn');
const shopCreditsText = document.getElementById('shop-credits-display');
const testBtnHUD = document.getElementById('test-btn');
const pauseBtnHUD = document.getElementById('pause-btn');
const supernovaBtn = document.getElementById("supernova-btn");
const supernovaChargeFill = document.getElementById("supernova-charge-fill");



// New Weapon Data Schema
const WEAPON_DATA = {
  energy: [
    { id: 'e1', name: 'Pulse Laser', price: 1200, dps: 15, energy: 10, rarity: 'Common', color: '#22c55e', desc: 'Standard rapid-fire. 10 DMG @ 1.5Hz.' },
    { id: 'e2', name: 'Ion Cannon', price: 4500, dps: 40, energy: 35, rarity: 'Rare', color: '#3b82f6', desc: 'Heavy disruption. 40 DMG + AOE Shockwave.' },
    { id: 'e3', name: 'Plasma Arc', price: 8900, dps: 22.5, energy: 60, rarity: 'Epic', color: '#a855f7', desc: 'Lightning Suppressor. 15 DMG @ 1.5Hz.' },


    { id: 'e4', name: 'Supernova', price: 25000, dps: 550, energy: 120, rarity: 'Legendary', color: '#f59e0b', desc: 'Experimental stellar core miniaturized into a weapon.' },
  ],
  kinetic: [
    { id: 'k1', name: 'Auto-Cannon', price: 800, dps: 35, energy: 2, rarity: 'Common', color: '#cbd5e1', desc: 'Old school mechanical fire. High heat, high fun.' },
    { id: 'k2', name: 'Railgun Mk II', price: 3200, dps: 180, energy: 15, rarity: 'Rare', color: '#3b82f6', desc: 'Electromagnetic acceleration of tungsten slugs.' },
    { id: 'k3', name: 'Gatling Shredder', price: 7200, dps: 320, energy: 25, rarity: 'Epic', color: '#a855f7', desc: 'A six-barrel nightmare for any light fighter.' },
    { id: 'k4', name: 'Gravity Driver', price: 18000, dps: 480, energy: 40, rarity: 'Legendary', color: '#f59e0b', desc: 'Uses micro-singularities to crush enemy vessels.' },
  ],
  missile: [
    { id: 'm1', name: 'Seeker Swarm', price: 2000, dps: 90, energy: 5, rarity: 'Common', color: '#cbd5e1', desc: 'Fires a cluster of low-yield tracking missiles.' },
    { id: 'm2', name: 'Torpedo Alpha', price: 5500, dps: 280, energy: 20, rarity: 'Rare', color: '#3b82f6', desc: 'Heavy anti-capital ship torpedo with high blast radius.' },
    { id: 'm3', name: 'EMP Warhead', price: 11000, dps: 150, energy: 30, rarity: 'Epic', color: '#a855f7', desc: 'Disables ship systems within a large radius on impact.' },
    { id: 'm4', name: 'The Reaper', price: 30000, dps: 750, energy: 50, rarity: 'Legendary', color: '#f59e0b', desc: 'Nuclear-tipped devastation. If you fire this, it stays dead.' },
  ]
};

// SVG Icon Generator (JS implementation of the Lucide icons provided)
function getWeaponIconSVG(id, color, size = 32) {
    const stroke = `stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
    let content = '';
    switch(id) {
        case 'e1': content = `<path d="M4 10l4 0M4 14l4 0M10 12l10 0" stroke-width="2" ${stroke}/>`; break;
        case 'e2': content = `<circle cx="12" cy="12" r="8" stroke-dasharray="4 2" ${stroke}/><circle cx="12" cy="12" r="3" fill="${color}" stroke="none" />`; break;
        case 'e3': content = `<path d="M3 12c3-4 6 4 9 0s6-4 9 0" ${stroke}/><path d="M3 14c3-4 6 4 9 0s6-4 9 0" opacity="0.5" ${stroke}/>`; break;
        case 'e4': content = `<path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" opacity="0.3" ${stroke}/><circle cx="12" cy="12" r="4" fill="${color}" stroke="none" /><circle cx="12" cy="12" r="6" stroke-width="1" ${stroke}/>`; break;
        case 'k1': content = `<rect x="4" y="9" width="12" height="6" rx="1" ${stroke}/><path d="M16 11h4M16 13h4" ${stroke}/>`; break;
        case 'k2': content = `<path d="M3 8h18M3 16h18" stroke-width="2" ${stroke}/><rect x="10" y="10" width="6" height="4" fill="${color}" stroke="none" />`; break;
        case 'k3': content = `<circle cx="9" cy="9" r="2" fill="${color}" stroke="none" /><circle cx="15" cy="9" r="2" fill="${color}" stroke="none" /><circle cx="12" cy="12" r="2" fill="${color}" stroke="none" /><circle cx="9" cy="15" r="2" fill="${color}" stroke="none" /><circle cx="15" cy="15" r="2" fill="${color}" stroke="none" /><circle cx="12" cy="12" r="8" stroke-width="1" ${stroke}/>`; break;
        case 'k4': content = `<path d="M12 3a9 9 0 0 0-9 9M12 21a9 9 0 0 0 9-9" opacity="0.4" ${stroke}/><path d="M8 12a4 4 0 0 1 8 0" ${stroke}/><rect x="11" y="11" width="2" height="2" fill="${color}" stroke="none" />`; break;
        case 'm1': content = `<path d="M6 8l3-3 3 3M12 16l3-3 3 3M6 18l3-3 3 3" ${stroke}/>`; break;
        case 'm2': content = `<path d="M4 12h12l4-4v8l-4-4" fill="${color}33" ${stroke}/><path d="M4 8v8" ${stroke}/>`; break;
        case 'm3': content = `<path d="M2 12h14M16 8l4 4-4 4" ${stroke}/><path d="M6 8a4 4 0 0 1 0 8M9 9a2 2 0 0 1 0 6" ${stroke}/>`; break;
        case 'm4': content = `<path d="M3 12h14M17 12l4-6v12l-4-6z" fill="${color}" stroke="none" /><path d="M2 8l4 4-4 4M5 8l4 4-4 4" ${stroke}/>`; break;
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24">${content}</svg>`;
}

// High-DPI canvas adjustment
function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 600 * dpr;
    canvas.height = 1000 * dpr;
    canvas.style.width = `min(100vw, ${1000 * (600/1000)}px)`;
    canvas.style.height = `100vh`;
    ctx.scale(dpr, dpr);
}
window.addEventListener('resize', resize);
resize();

let gameState = 'START'; 
let score = 0;
let credits = 45000;
let currentWave = 1;
let enemies = [];
let projectiles = [];
let particles = [];
let visuals = []; 
let stars = [];
let player = null;
let keys = {};
let enemyIdCounter = 0;

class Star {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * 600;
        this.y = Math.random() * 1000;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 3 + 1;
    }
    update() {
        this.y += this.speed;
        if (this.y > 1000) this.y = -10;
    }
    draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}

class Projectile {
    constructor(x, y, weaponData = null, level = 1) {
        this.x = x; this.y = y; this.active = true;
        this.targetId = null;
        this.level = level;
        this.frame = 0;
        
        if (!weaponData) {
            this.type = 'laser'; this.damage = 10; this.speed = 14; 
            this.color = "#f43f5e"; this.width = 3; this.height = 20;
            this.vx = 0; this.vy = -this.speed; this.angle = -Math.PI/2;
        } else {
            this.weaponId = weaponData.id;
            this.color = weaponData.color;
            this.archetype = this.getArchetype(weaponData.id);
            this.damage = (weaponData.dps / 5) * (1 + (level - 1) * 0.2);
            if (this.weaponId === 'e1') this.damage = 10;
            if (this.weaponId === 'e2') this.damage = 40;
            if (this.weaponId === 'e3') this.damage = 15;



            this.speed = (weaponData.id === 'e1' ? 6 : 10 + (level * 2)); // Halved from 12+ for Pulse
            
            // Physical Properties

            this.width = 4; this.height = 12;
            this.vx = 0; this.vy = -this.speed;
            this.angle = -Math.PI / 2;
            this.life = 500; // frames (Ensures slow projectiles reach edges)
            
            // Unique Archetype Setup
            this.setupArchetype(weaponData);
        }
    }

    getArchetype(id) {
        if (id.startsWith('e')) return 'energy';
        if (id.startsWith('k')) return 'kinetic';
        return 'missile';
    }

    setupArchetype(w) {
        switch(this.weaponId) {
            case 'e2': this.width = 20; this.height = 20; this.speed = 3.15; break; // Ion (Reduced size & speed)
            case 'e3': this.life = 30; this.speed = 0; break; // Plasma Spark (500ms afterimage)


            case 'e4': this.width = 15; this.height = 15; this.speed = 5; break; // Supernova
            case 'k1': this.vx = (Math.random() - 0.5) * 4; break; // Spread
            case 'k2': this.height = 1000; this.speed = 0; this.life = 5; break; // Railgun inf
            case 'm1': this.width = 4; this.height = 4; this.speed = 12; break; // Swarm
            case 'm2': this.width = 12; this.height = 20; break; // Torpedo
            case 'm4': this.width = 60; this.height = 60; this.speed = 2; break; // Reaper
        }
        this.vy = -this.speed;
    }

    update(occupiedTargetIds) {
        this.frame++;
        
        // Weapon Logic
        if (this.weaponId === 'm1' || this.weaponId === 'm2' || this.weaponId === 'm3' || this.weaponId === 'm4') {
            this.updateSeeking(occupiedTargetIds);
        }

        if (this.weaponId === 'e3') { // Beam sticks to player
            this.x = player.x + player.width/2;
            this.y = player.y - 40;
        } else {
            this.x += this.vx;
            this.y += this.vy;
        }

        this.life--;
        if (this.life <= 0 || this.y < -100 || this.y > 1100 || this.x < -100 || this.x > 700) {
            this.active = false;
        }
    }

    updateSeeking(occupiedTargetIds) {
        let target = null;
        if (this.targetId !== null) {
            target = enemies.find(e => e.id === this.targetId && e.active);
            if (!target) this.targetId = null;
        }
        if (this.targetId === null) {
            let minDist = 800;
            for (let e of enemies) {
                if (e.y < this.y && !occupiedTargetIds.has(e.id)) {
                    let d = Math.hypot(e.x - this.x, e.y - this.y);
                    if (d < minDist) { minDist = d; target = e; }
                }
            }
            if (target) { this.targetId = target.id; occupiedTargetIds.add(target.id); }
        }
        if (target) {
            let targetAngle = Math.atan2(target.y - this.y, target.x - this.x);
            let diff = targetAngle - this.angle;
            while (diff < -Math.PI) diff += Math.PI * 2;
            while (diff > Math.PI) diff -= Math.PI * 2;
            this.angle += diff * 0.15; 
            this.vx = Math.cos(this.angle) * this.speed;
            this.vy = Math.sin(this.angle) * this.speed;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle + Math.PI/2);
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;

        if (this.weaponId === 'e2') { // Sphere
            ctx.beginPath(); ctx.arc(0, 0, this.width/2, 0, Math.PI*2); ctx.fill();
        } else if (this.weaponId === 'e3') { // Lightning Strike
            if (!this.target) return;
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#fff";
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2 + Math.random() * 2;
            ctx.globalAlpha = this.life / 30;

            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            
            // Generate Jagged Path
            let tx = this.target.x + this.target.width / 2 - (this.x);
            let ty = this.target.y + this.target.height / 2 - (this.y);
            let segments = 5;
            for (let i = 1; i <= segments; i++) {
                let px = (tx / segments) * i + (Math.random() - 0.5) * 30;
                let py = (ty / segments) * i + (Math.random() - 0.5) * 30;
                if (i === segments) { px = tx; py = ty; }
                ctx.lineTo(px, ty); // Typo here usually ty or py? py. 
                // Using py: ctx.lineTo(px, py);
            }
            ctx.stroke();
            
            // Inner core
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 1;
            ctx.stroke();
        } else {

            ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        }

        ctx.restore();
    }
}


class Enemy {
    constructor(x, y, speed, classification = 'common') {
        this.id = enemyIdCounter++;
        this.x = x; this.y = y;
        this.classification = classification;
        this.vx = 0; this.vy = speed;
        this.attackTimer = 0;
        this.blinkTimer = 0;
        this.dying = false;
        this.alpha = 1;




        
        // Stats based on classification
        switch(classification) {
            case 'target':
                this.width = 150; this.height = 150;
                this.hp = 10000;
                this.scoreVal = 0; this.creditVal = 0;
                this.color = "#ffffff";
                this.vx = 0.1; // 5-6px per second roughly (at 60fps)
                this.vy = 0;
                break;
            case 'miniboss':
                this.width = 120; this.height = 120;
                this.hp = 150 + (currentWave * 20);
                this.scoreVal = 1000; this.creditVal = 250;
                this.color = "#6b21a8";
                this.attackCooldown = 4000;
                // Intel Movement States
                this.state = 'INIT'; 
                this.targetX = 240; this.targetY = 100;
                this.moveTimer = 0;
                break;

            case 'elite':
                this.width = 50; this.height = 50;
                this.hp = 40 + (currentWave * 5);
                this.scoreVal = 300; this.creditVal = 50;
                this.color = "#ec4899";
                break;
            case 'common':
                this.width = 40; this.height = 40;
                this.hp = 10;
                this.scoreVal = 100; this.creditVal = 25;
                this.color = "#dc2626";
                this.type = Math.floor(Math.random() * 3);
                break;
            case 'dart':
                this.width = 15; this.height = 25;
                this.hp = 5;
                this.scoreVal = 20; this.creditVal = 2;
                this.color = "#e879f9";
                break;
            default:
                this.width = 40; this.height = 40;
                this.hp = 10 + (currentWave * 2);
                this.scoreVal = 100; this.creditVal = 10;
                this.color = Math.random() > 0.5 ? "#00ffff" : "#00ff88";
        }
        
        this.maxHp = this.hp;
        this.active = true;
        this.type = Math.floor(Math.random() * 3); // For common variety
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        if (this.alpha < 1) ctx.globalAlpha = this.alpha;
        ctx.scale(this.width / 100, this.height / 100);


        if (this.classification === 'miniboss' || this.classification === 'target') {
            this.drawSpaceBaracuda();
        } else if (this.classification === 'elite') {
            this.drawElite();
        } else if (this.classification === 'dart') {
            this.drawDart();
        } else {
            this.drawLowLevel();
        }





        // HP Bar
        if (this.hp < this.maxHp) {
            ctx.restore(); ctx.save();
            const barW = 50;
            const bx = this.x + (this.width - barW) / 2;
            const by = this.y - 15;
            
            // Background
            ctx.fillStyle = "rgba(255,255,255,0.1)"; 
            ctx.fillRect(bx, by, barW, 4);
            
            // Fill
            ctx.fillStyle = (this.hp / this.maxHp < 0.3) ? "#f43f5e" : this.color; 
            ctx.fillRect(bx, by, (Math.max(0, this.hp / this.maxHp)) * barW, 4);
        }

        ctx.restore();
    }

    drawSpaceBaracuda() {
        ctx.save();
        ctx.translate(50, 50);
        ctx.scale(1, -1); // FLIP VERTICALLY
        ctx.translate(-50, -50);


        // Main Body
        ctx.fillStyle = "#6b21a8";
        ctx.beginPath(); ctx.moveTo(50, 0); ctx.quadraticCurveTo(65, 40, 50, 80); ctx.quadraticCurveTo(35, 40, 50, 0); ctx.fill();

        // Left Fin
        ctx.fillStyle = "rgba(126, 34, 206, 0.6)";
        ctx.beginPath(); ctx.moveTo(35, 30); ctx.quadraticCurveTo(10, 40, 20, 70); ctx.quadraticCurveTo(35, 60, 40, 40); ctx.fill();
        
        // Right Fin
        ctx.beginPath(); ctx.moveTo(65, 30); ctx.quadraticCurveTo(90, 40, 80, 70); ctx.quadraticCurveTo(65, 60, 60, 40); ctx.fill();

        // Tail Fins
        ctx.fillStyle = "rgba(147, 51, 234, 0.4)";
        ctx.beginPath(); ctx.moveTo(40, 65); ctx.quadraticCurveTo(25, 75, 30, 95); ctx.quadraticCurveTo(45, 90, 45, 75); ctx.fill();
        ctx.beginPath(); ctx.moveTo(60, 65); ctx.quadraticCurveTo(75, 75, 70, 95); ctx.quadraticCurveTo(55, 90, 55, 75); ctx.fill();

        // Glows
        ctx.fillStyle = "#e879f9";
        [20, 40, 60].forEach(y => { ctx.beginPath(); ctx.arc(50, y, 1.5, 0, Math.PI*2); ctx.fill(); });

        // Brow & Antenna
        ctx.strokeStyle = "#e879f9"; ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(45, 10); ctx.quadraticCurveTo(50, 5, 55, 10); ctx.stroke();
        ctx.setLineDash([1, 1]);
        ctx.beginPath(); ctx.moveTo(50, 80); ctx.quadraticCurveTo(50, 95, 50, 100); ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
    }

    drawDart() {
        ctx.fillStyle = "#e879f9";
        ctx.beginPath();
        ctx.moveTo(50, 0); ctx.lineTo(70, 100); ctx.lineTo(50, 80); ctx.lineTo(30, 100);
        ctx.closePath(); ctx.fill();
        ctx.shadowBlur = 10; ctx.shadowColor = "#e879f9";
    }


    drawLowLevel() {
        // Body (Needle shape)
        ctx.fillStyle = "#1a0505";
        ctx.strokeStyle = "#dc2626";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(50, 0); ctx.lineTo(55, 50); ctx.lineTo(50, 95); ctx.lineTo(45, 50);
        ctx.closePath(); ctx.fill(); ctx.stroke();

        // Fin-like wings
        ctx.fillStyle = "rgba(127, 29, 29, 0.4)";
        // Left
        ctx.beginPath();
        ctx.moveTo(45, 40); ctx.quadraticCurveTo(10, 30, 15, 60); ctx.quadraticCurveTo(45, 55, 45, 45);
        ctx.fill();
        // Right
        ctx.beginPath();
        ctx.moveTo(55, 40); ctx.quadraticCurveTo(90, 30, 85, 60); ctx.quadraticCurveTo(55, 55, 55, 45);
        ctx.fill();

        // Eye
        ctx.fillStyle = "#ffffff";
        ctx.beginPath(); ctx.arc(50, 40, 2, 0, Math.PI * 2); ctx.fill();
    }

    drawElite() {
        ctx.shadowBlur = 10; ctx.shadowColor = this.color;
        ctx.strokeStyle = this.color; ctx.lineWidth = 3;
        ctx.strokeRect(20, 20, 60, 60);
        ctx.fillRect(40, 40, 20, 20);
    }

    drawCommon() {
        ctx.shadowBlur = 15; ctx.shadowColor = this.color;
        ctx.strokeStyle = this.color; ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; ctx.lineWidth = 2;
        ctx.beginPath();
        if (this.type === 0) { ctx.moveTo(50, 10); ctx.lineTo(90, 50); ctx.lineTo(50, 90); ctx.lineTo(10, 50); } 
        else if (this.type === 1) { for(let i=0; i<6; i++) { const a = (i/6)*Math.PI*2; ctx.lineTo(50+Math.cos(a)*40, 50+Math.sin(a)*40); } } 
        else { for(let i=0; i<8; i++) { const r = i%2===0 ? 40 : 20; const a = (i/8)*Math.PI*2; ctx.lineTo(50+Math.cos(a)*r, 50+Math.sin(a)*r); } }
        ctx.closePath(); ctx.fill(); ctx.stroke();
    }

    update() { 
        if (this.dying) {
            this.alpha -= 0.05;
            this.y += this.vy * 0.5; // Drift
            if (this.alpha <= 0) this.active = false;
            return;
        }

        if (this.classification === 'miniboss') {

            this.updateMiniBossAI();
        } else if (this.classification === 'target') {
            this.x += this.vx;
            if (this.x < 50 || this.x > 550 - this.width) this.vx *= -1;
            // No Y movement
        } else {

            // Horizontal Jitter for Scouts
            if (this.classification === 'common') {
                if (!this.vx || Math.random() < 0.02) this.vx = (Math.random() - 0.5);
            }

            
            this.x += this.vx;
            this.y += this.vy; 
            
            // Boundary bounce for scouts
            if (this.classification === 'common') {
                if (this.x < 20 || this.x > 580 - this.width) this.vx *= -1;
            }

        }


        if (this.y > 1000 || this.x < -100 || this.x > 700) this.active = false; 
    }

    updateMiniBossAI() {
        // Attack logic remains
        this.attackTimer += 16.6;
        if (this.attackTimer >= this.attackCooldown) {
            this.attackTimer = 0;
            this.spawnDarts();
        }

        // State Machine Movement
        this.moveTimer -= 16.6;
        
        if (this.moveTimer <= 0) {
            // Pick a new state
            const r = Math.random();
            if (this.state === 'INIT' || r < 0.2) {
                this.state = 'POSITIONING';
                this.targetX = Math.random() * (600 - this.width);
                this.targetY = 50 + Math.random() * 200;
                this.moveTimer = 2000 + Math.random() * 2000;
            } else if (r < 0.6) {
                this.state = 'STRAFE';
                this.targetX = this.x < 300 ? 400 : 50; 
                this.moveTimer = 3000;
            } else {
                this.state = 'STATIONARY';
                this.moveTimer = 2000;
            }
        }

        // Interpolate towards target
        if (this.state === 'POSITIONING' || this.state === 'STRAFE') {
            this.x += (this.targetX - this.x) * 0.03;
            this.y += (this.targetY - this.y) * 0.02;
        } else if (this.state === 'STATIONARY') {
            // Slight hover wobble
            this.x += Math.sin(Date.now() * 0.002) * 1;
            this.y += Math.cos(Date.now() * 0.002) * 0.5;
        }

        // Hard bounds
        this.x = Math.max(0, Math.min(600 - this.width, this.x));
    }

    spawnDarts() {
        const cx = this.x + this.width / 2;
        const cy = this.y + this.height / 2;
        for (let i = 0; i < 6; i++) {
            const dart = new Enemy(cx, cy, 5, 'dart');
            dart.vx = (i - 2.5) * 1.5; // Spread horizontally
            dart.vy = 6;              // Constant downwards
            enemies.push(dart);
        }
    }

}


class Player {
    constructor() { this.width = 60; this.height = 60; this.reset(); }
    reset() {
        this.x = 300 - this.width / 2; this.y = 1000 - 150; this.speed = 4.2;
        this.hp = 30; this.maxHp = 30; 
        this.inventory = { 'e1': 1 }; // Start with Pulse Laser LVL 1
        this.disabledWeapons = new Set(); // To track disabled gear
        this.targetX = this.x; this.isTouching = false; this.isFlickering = 0;
        this.lastMainShot = 0; this.lastSpecialShots = {};
        this.burstQueue = []; // For staggered fire
        this.supernovaCharge = 5000; // Starts charged
        this.supernovaMaxCharge = 5000;
        this.supernovaActive = false;
        this.supernovaTimer = 0;
        this.supernovaR = 0;
    }

    activateSupernova() {
        if (this.supernovaCharge >= this.supernovaMaxCharge && !this.supernovaActive) {
            this.supernovaActive = true;
            this.supernovaTimer = 2000; // 2 seconds
            this.supernovaR = 0;
            this.supernovaCharge = 0;
        }
    }




    draw() {
        if (this.isFlickering > 0 && Math.floor(Date.now() / 50) % 2 === 0) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.width / 100, this.height / 100);

        // Gradient for main body (Void Metallic)
        const grad = ctx.createLinearGradient(0, 0, 0, 100);
        grad.addColorStop(0, '#6b21a8');
        grad.addColorStop(1, '#3b0764');

        // Left Wing
        ctx.fillStyle = "#2e1065";

        ctx.beginPath();
        ctx.moveTo(28, 55);
        ctx.quadraticCurveTo(5, 70, 5, 95);
        ctx.quadraticCurveTo(28, 90, 28, 75);
        ctx.closePath();
        ctx.fill();

        // Right Wing
        ctx.beginPath();
        ctx.moveTo(72, 55);
        ctx.quadraticCurveTo(95, 70, 95, 95);
        ctx.quadraticCurveTo(72, 90, 72, 75);
        ctx.closePath();
        ctx.fill();

        // Main Body
        ctx.fillStyle = grad;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#7c3aed";
        ctx.beginPath();
        ctx.moveTo(50, 5);
        ctx.lineTo(72, 85);
        ctx.lineTo(50, 72);
        ctx.lineTo(28, 85);
        ctx.closePath();
        ctx.fill();

        // Energy Core
        ctx.fillStyle = "rgba(245, 208, 254, 0.6)";
        ctx.beginPath();
        ctx.moveTo(50, 20);
        ctx.quadraticCurveTo(55, 40, 50, 60);
        ctx.quadraticCurveTo(45, 40, 50, 20);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        // Supernova Effect
        if (this.supernovaActive) {
            ctx.save();
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            
            // Outer glow
            ctx.shadowBlur = 40;
            ctx.shadowColor = "#f59e0b";
            
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.supernovaR);
            grad.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
            grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.4)');
            grad.addColorStop(1, 'rgba(251, 191, 36, 0.8)');
            
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, this.supernovaR, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = "#fbbf24";
            ctx.lineWidth = 4;
            ctx.stroke();
            
            ctx.restore();
        }

    }

    update() {
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) this.x -= this.speed;
        if (keys['ArrowRight'] || keys['d'] || keys['D']) this.x += this.speed;
        if (this.isTouching) { let dx = this.targetX - (this.x + this.width / 2); this.x += dx * 0.105; }
        this.x = Math.max(0, Math.min(600 - this.width, this.x));
        if (this.isFlickering > 0) this.isFlickering--;
        // Update Supernova
        const dt = 16.6; // Approximating 60fps
        if (gameState === 'PLAYING' && this.inventory['e4'] && !this.disabledWeapons.has('e4')) {
            supernovaBtn.style.display = 'flex';

            if (this.supernovaActive) {
                this.supernovaTimer -= dt;
                this.supernovaR = ((2000 - this.supernovaTimer) / 2000) * 500;
                
                // Damage Logic
                const cx = this.x + this.width / 2;
                const cy = this.y + this.height / 2;
                enemies.forEach(e => {
                    if (!e.dying && e.active) {
                        const dist = Math.hypot(cx - (e.x + e.width/2), cy - (e.y + e.height/2));
                        if (dist < this.supernovaR) {
                            e.hp -= 30; // 30 DMG as requested
                            if (e.hp <= 0) {
                                e.dying = true;
                                score += e.scoreVal;
                                credits += e.creditVal;
                            }
                        }
                    }
                });

                if (this.supernovaTimer <= 0) {
                    this.supernovaActive = false;
                }
            } else {
                if (this.supernovaCharge < this.supernovaMaxCharge) {
                    this.supernovaCharge += dt;
                }
            }
            
            // UI Update
            const fillPct = (this.supernovaCharge / this.supernovaMaxCharge) * 100;
            supernovaChargeFill.style.width = `${fillPct}%`;
            supernovaBtn.style.opacity = fillPct >= 100 ? '1' : '0.6';
            supernovaBtn.style.boxShadow = fillPct >= 100 ? '0 0 15px rgba(245, 158, 11, 0.4)' : 'none';

        } else {
            supernovaBtn.style.display = 'none';
        }

        this.handleWeaponSystems();


        // Process burst queue
        const now = Date.now();
        for (let i = this.burstQueue.length - 1; i >= 0; i--) {
            const b = this.burstQueue[i];
            if (now >= b.time) {
                projectiles.push(new Projectile(b.x, this.y, b.weapon, b.level));
                this.burstQueue.splice(i, 1);
            }
        }
    }

    handleWeaponSystems() {
        const now = Date.now(); const cx = this.x + this.width / 2;
        
        Object.keys(this.inventory).forEach(id => {
            const level = this.inventory[id];
            if (level <= 0 || this.disabledWeapons.has(id) || id === 'e4') return; // Exclude e4

            
            let weapon = null;

            Object.values(WEAPON_DATA).forEach(cat => {
                const found = cat.find(w => w.id === id);
                if (found) weapon = found;
            });
            
            if (weapon) {
                const lastFire = this.lastSpecialShots[id] || 0;
                let fireDelay = 2000 - (weapon.energy * 10);
                
                // Weapon Specific Cadence logic
                if (id === 'e1') fireDelay = 667; 
                if (id === 'e2') fireDelay = 1500;
                if (id === 'e3') fireDelay = 667; 


                if (id === 'm1') fireDelay = 3000; // Swarm
                
                if (now - lastFire > fireDelay) {
                    if (id === 'e1') { // Butterfly/Alternating Burst
                        const count = level;
                        const spread = 20;
                        const startX = cx - ((count - 1) * spread) / 2;
                        
                        // Calculate firing order (Center, then alternate)
                        const mid = Math.floor(count / 2);
                        const order = [mid];
                        for (let i = 1; i <= mid; i++) {
                            if (mid - i >= 0) order.push(mid - i);
                            if (mid + i < count) order.push(mid + i);
                        }
                        // Remove duplicates (e.g. if count is even, mid might overlap)
                        const uniqueOrder = [...new Set(order)];
                        
                        uniqueOrder.forEach((idx, i) => {
                            this.burstQueue.push({
                                time: now + (i * 25),
                                x: startX + (idx * spread),
                                weapon, level
                            });
                        });
                    } else if (id === 'e3') { // Lightning Logic
                        let target = null;
                        let minDist = 400; // 400px range
                        enemies.forEach(e => {
                            if (e.dying) return;
                            const d = Math.hypot(cx - (e.x + e.width/2), this.y - (e.y + e.height/2));
                            if (d < minDist) { minDist = d; target = e; }
                        });
                        
                        if (target) {
                            const p = new Projectile(cx, this.y, weapon, level);
                            p.target = target;
                            projectiles.push(p);
                            target.hp -= 15; // Specific damage: 15
                            if (target.hp <= 0) {
                                target.dying = true;
                                score += target.scoreVal;
                                credits += target.creditVal;
                            }
                            this.lastSpecialShots[id] = now;
                        }

                    } else if (id === 'm1') {

 // Swarm logic

                        for(let i=0; i<8; i++) {
                            const p = new Projectile(cx, this.y, weapon, level);
                            p.angle = -Math.PI/2 + (i - 3.5) * 0.2;
                            p.vx = Math.cos(p.angle) * p.speed;
                            p.vy = Math.sin(p.angle) * p.speed;
                            projectiles.push(p);
                        }
                    } else {
                        projectiles.push(new Projectile(cx, this.y, weapon, level));
                    }
                    this.lastSpecialShots[id] = now;
                    if (id.startsWith('k')) this.screenShake = 5;
                }
            }
        });
    }

    takeDamage(amt) { this.hp -= amt; this.isFlickering = 40; if (this.hp <= 0) gameOver(); }
}

// Armory Hub Hub UI Logic
let currentHubView = 'shop';

function renderHub() {
    shopCreditsText.innerText = credits.toLocaleString();
    renderShopView();
    renderHangarView();
    document.getElementById('hangar-count').innerText = `(${getHangarItems().length})`;
}

function renderShopView() {
    const shopView = document.getElementById('view-shop');
    shopView.innerHTML = '';
    
    const sections = [
        { key: 'energy', title: 'Energy Systems', iconId: 'e1' },
        { key: 'kinetic', title: 'Kinetic Ballistics', iconId: 'k1' },
        { key: 'missile', title: 'Missile Ordnance', iconId: 'm1' }
    ];

    sections.forEach(sec => {
        const secEl = document.createElement('div');
        secEl.className = 'hub-section';
        secEl.innerHTML = `
            <div class="section-header">
                <div class="sec-ico-box">${getWeaponIconSVG(sec.iconId, '#22d3ee', 16)}</div>
                <h2 class="section-title">${sec.title}</h2>
                <div class="section-line"></div>
            </div>
            <div class="weapon-scroll" id="scroll-${sec.key}"></div>
        `;
        shopView.appendChild(secEl);

        
        const scroll = secEl.querySelector('.weapon-scroll');
        WEAPON_DATA[sec.key].forEach(w => {
            const count = player.inventory[w.id] || 0;
            const isMaxed = count >= 5;
            const canAfford = credits >= w.price;
            
            const card = document.createElement('div');
            card.className = `weapon-card-hub ${isMaxed ? 'maxed' : (!canAfford ? 'disabled' : '')}`;
            
            const isOwned = count > 0;
            const isDisabled = player.disabledWeapons.has(w.id);
            
            let dots = '';
            for(let i=0; i<5; i++) dots += `<div class="lvl-dot ${i < count ? 'active' : ''}"></div>`;
            
            card.innerHTML = `
                <div class="card-levels">${dots}</div>
                <div class="card-ico-box">${getWeaponIconSVG(w.id, isMaxed ? '#22d3ee' : w.color, 40)}</div>
                <div class="card-info">
                    <h3 class="card-title">${w.name}</h3>
                    <p class="card-rarity" style="color: ${w.color}">${w.rarity}</p>
                </div>
                ${isOwned ? `
                <div class="card-mount-status">
                    <button class="mount-toggle ${isDisabled ? 'off' : 'on'}">
                        ${isDisabled ? 'OFFLINE' : 'ACTIVE'}
                    </button>
                </div>
                ` : ''}
                <div class="card-btn ${isMaxed ? 'maxed' : (canAfford ? 'can-buy' : 'cant-buy')}">
                    ${isMaxed ? '<span class="maxed-text">MAXED</span>' : `
                        <span class="price-val ${!canAfford ? 'expensive' : ''}">${w.price >= 1000 ? (w.price/1000).toFixed(1)+'K' : w.price}</span>
                    `}
                </div>
            `;
            
            if (isOwned) {
                const mt = card.querySelector('.mount-toggle');
                if (mt) {
                    mt.onclick = (e) => {
                        e.stopPropagation();
                        if (player.disabledWeapons.has(w.id)) player.disabledWeapons.delete(w.id);
                        else player.disabledWeapons.add(w.id);
                        renderHub();
                    };
                }
            }
            
            if (!isMaxed && canAfford) {
                card.onclick = () => {
                   credits -= w.price;
                   player.inventory[w.id] = (player.inventory[w.id] || 0) + 1;
                   renderHub();
                };
            }
            scroll.appendChild(card);
        });

    });
}

function getHangarItems() {
    const items = [];
    Object.keys(player.inventory).forEach(id => {
        if (player.inventory[id] > 0) {
            let weapon = null;
            Object.values(WEAPON_DATA).forEach(cat => {
                const found = cat.find(w => w.id === id);
                if (found) weapon = found;
            });
            if (weapon) items.push({ ...weapon, count: player.inventory[id] });
        }
    });
    return items;
}

function renderHangarView() {
    const grid = document.getElementById('hangar-grid');
    grid.innerHTML = '';
    const items = getHangarItems();
    
    if (items.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 40px; opacity:0.3; font-size:10px;">PURCHASE EQUIPMENT TO FILL VAULT</div>';
        return;
    }
    
    items.forEach(item => {
        const el = document.createElement('div');
        el.className = `hangar-item`;
        el.innerHTML = `
            <div class="item-top">
                <div class="item-ico-small">${getWeaponIconSVG(item.id, item.color, 32)}</div>
                <div class="item-status-tag ${player.disabledWeapons.has(item.id) ? 'off' : 'on'}">
                    ${player.disabledWeapons.has(item.id) ? 'STOWED' : 'MOUNTED'}
                </div>
            </div>
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <div class="item-footer">
                    <span class="item-rarity" style="color: ${item.color}">${item.rarity}</span>
                    <span class="item-stock">LVL ${item.count}</span>
                </div>
            </div>
        `;
        grid.appendChild(el);
    });

}


// Tab Switching
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.onclick = () => {
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        document.getElementById('view-shop').style.display = target === 'shop' ? 'block' : 'none';
        document.getElementById('view-ability').style.display = target === 'ability' ? 'block' : 'none';
        document.getElementById('view-hangar').style.display = target === 'hangar' ? 'block' : 'none';
    };
});

// Controls
window.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (e.code === 'Space') {
        if (gameState === 'PLAYING') {
            gameState = 'SHOP';
            shopScreen.style.display = 'flex';
            renderHub();
        } else if (gameState === 'SHOP') {
            gameState = 'PLAYING';
            shopScreen.style.display = 'none';
        }
    }
});

window.addEventListener('keyup', e => keys[e.key] = false);

function handleInput(e) {
    if (gameState !== 'PLAYING') return;
    let clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const rect = canvas.getBoundingClientRect();
    player.targetX = (clientX - rect.left) * (600 / rect.width);
    player.isTouching = true;
}
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleInput(e); }, { passive: false });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); handleInput(e); }, { passive: false });
canvas.addEventListener('touchend', () => { if(player) player.isTouching = false; });
canvas.addEventListener('mousedown', handleInput);
canvas.addEventListener('mousemove', (e) => { if(e.buttons > 0) handleInput(e); });
canvas.addEventListener('mouseup', () => { if(player) player.isTouching = false; });

for (let i = 0; i < 100; i++) stars.push(new Star());
player = new Player();

function startGame() {
    score = 0; credits = 45000; currentWave = 1;
    enemies = []; projectiles = []; particles = []; visuals = []; enemyIdCounter = 0;
    player.reset();
    gameState = 'PLAYING';
    startScreen.style.display = 'none'; gameoverScreen.style.display = 'none';
    shopBtnHUD.style.display = 'block';
    testBtnHUD.style.display = 'block';
    pauseBtnHUD.style.display = 'block';
    spawnWave();



    // TEST SPAWN: Space Baracuda after 3 seconds (30% Slower Vy: 0.35)
    setTimeout(() => {
        if (gameState === 'PLAYING') {
            console.log("TESTING: Spawning Space Baracuda...");
            // enemies.push(new Enemy(250, -150, 0.35, 'miniboss'));
        }
    }, 3000);
}

function startTestMode() {
    score = 0; credits = 45000;
    enemies = []; projectiles = []; particles = []; visuals = [];
    player.reset();
    gameState = 'PLAYING';
    startScreen.style.display = 'none'; gameoverScreen.style.display = 'none';
    shopBtnHUD.style.display = 'block'; testBtnHUD.style.display = 'block';
    pauseBtnHUD.style.display = 'block';

    
    // Spawn Target Baracuda
    const target = new Enemy(225, 150, 0, 'target');
    enemies.push(target);
}




function spawnWave() {
    enemies = [];
    const count = 5;
    for (let i = 0; i < count; i++) {
        const x = Math.random() * 500 + 50;
        const y = -100 - (Math.random() * 300);
        enemies.push(new Enemy(x, y, Math.min(3.5, 0.8 + (currentWave * 0.2)), 'common'));
    }
}





function gameOver() {
    gameState = 'GAMEOVER';
    gameoverScreen.style.display = 'flex'; shopBtnHUD.style.display = 'none';
    document.getElementById('final-stats').innerText = `COMBAT SCORE: ${score.toLocaleString()}\nCREDITS POOLED: ${credits.toLocaleString()}\nSECTORS CLEARED: ${currentWave - 1}`;
}

function drawHUD() {
    // Sector telemetry and HP bar removed per command (Migrated to CSS HUD)
    
    // Tactical Range Altimeter (Right Side)

    const rx = 585;
    const py = player.y;
    ctx.strokeStyle = "rgba(0, 255, 255, 0.2)";
    ctx.beginPath(); ctx.moveTo(rx, 0); ctx.lineTo(rx, 1000); ctx.stroke();
    for(let y = 0; y <= 1000; y += 50) {
        const dist = Math.round(py - y);
        ctx.beginPath(); ctx.moveTo(rx - 4, y); ctx.lineTo(rx, y); ctx.stroke();
        if (y % 200 === 0) {

            ctx.fillStyle = "rgba(0, 255, 255, 0.4)";
            ctx.font = "800 8px Inter"; ctx.textAlign = "right";
            ctx.fillText(dist, rx - 8, y + 3);
        }
    }
}



function update() {
    stars.forEach(s => s.update());
    if (gameState === 'PLAYING') {
        player.update();
        if (player.screenShake > 0) player.screenShake *= 0.9;
        
        // Update DOM Score
        document.getElementById('scoreHUD').innerText = `SCORE: ${score.toLocaleString()}`;
        document.getElementById('scoreHUD').style.display = 'block';

        // Update DOM HP
        const hpFill = document.getElementById('hp-fill');
        const hpPct = (player.hp / player.maxHp) * 100;
        hpFill.style.width = `${Math.max(0, hpPct)}%`;
        hpFill.style.backgroundColor = player.hp < 10 ? "#ef4444" : "#22d3ee";
        document.getElementById('hp-container').style.display = 'block';



        const occupiedTargetIds = new Set();
        for (let p of projectiles) if (p.active && p.weaponId && p.weaponId.startsWith('m') && p.targetId !== null) occupiedTargetIds.add(p.targetId);
        
        for (let i = projectiles.length - 1; i >= 0; i--) {
            let p = projectiles[i]; p.update(occupiedTargetIds);
            if (!p.active) { projectiles.splice(i, 1); continue; }
            for (let j = enemies.length - 1; j >= 0; j--) {
                let e = enemies[j];
                const dist = Math.hypot(p.x - (e.x + e.width/2), p.y - (e.y + e.height/2));
                const hit = dist < (e.width/2 + p.width/2);
                
                if (hit) {
                    e.hp -= p.damage;
                    
                    // AOE Logic
                    if (p.weaponId === 'e2') { // Ion AOE
                        const ionMaxR = 100 + (p.level - 1) * 30;
                        visuals.push({ type: 'ionWave', x: p.x, y: p.y, r: 0, maxR: ionMaxR, dr: ionMaxR / 25, alpha: 1, color: '#3b82f6' });
                        // AOE Damage
                        enemies.forEach(other => {
                            if (other !== e && other.active && !other.dying) {
                                const d = Math.hypot(p.x - (other.x + other.width/2), p.y - (other.y + other.height/2));
                                if (d < ionMaxR) {
                                    other.hp -= p.damage;
                                    if (other.hp <= 0) {
                                        other.dying = true;
                                        score += other.scoreVal;
                                        credits += other.creditVal;
                                    }
                                }
                            }
                        });

                    }




                    if (p.weaponId === 'm2' || p.weaponId === 'e4') {
                        spawnExplosion(p.x, p.y, p.color);
                        enemies.forEach(other => {
                            if (other !== e && other.active && !other.dying) {
                                const d = Math.hypot(p.x - (other.x + other.width/2), p.y - (other.y + other.height/2));
                                if (d < 150) {
                                    other.hp -= p.damage * 0.5;
                                    if (other.hp <= 0) {
                                        other.dying = true;
                                        score += other.scoreVal;
                                        credits += other.creditVal;
                                    }
                                }
                            }
                        });
                    }



                    if (p.weaponId !== 'k2' && p.weaponId !== 'e3') p.active = false; 
                    if (e.hp <= 0 && !e.dying) { 
                        e.dying = true;
                        score += e.scoreVal; 
                        credits += e.creditVal; 
                    }
                    break;

                }
            }
        }
        for (let i = enemies.length - 1; i >= 0; i--) {
            let e = enemies[i]; e.update();
            if (e.y + e.height > player.y && e.y < player.y + player.height && e.x < player.x + player.width && e.x + e.width > player.x) { player.takeDamage(e.damage); enemies.splice(i, 1); continue; }
            if (!e.active) { enemies.splice(i, 1); }
        }
        if (enemies.length === 0) { currentWave++; spawnWave(); }
    }
}

function spawnExplosion(x, y, color) {
    for(let i=0; i<8; i++) {
        visuals.push({
            x, y, vx: (Math.random()-0.5)*10, vy: (Math.random()-0.5)*10,
            life: 20, color, size: Math.random()*4+2
        });
    }
}


function draw() {
    ctx.save();
    if (player && player.screenShake > 1) {
        ctx.translate((Math.random()-0.5)*player.screenShake, (Math.random()-0.5)*player.screenShake);
    }
    ctx.clearRect(0, 0, 600, 1000); stars.forEach(s => s.draw());
    
    visuals.forEach((v, i) => {
        if (v.type === 'ionWave') {
            v.r += v.dr; v.alpha -= 0.04;




            ctx.save();
            ctx.strokeStyle = v.color;
            ctx.globalAlpha = v.alpha;
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(v.x, v.y, v.r, 0, Math.PI * 2); ctx.stroke();
            ctx.restore();
            if (v.alpha <= 0) visuals.splice(i, 1);
        } else {
            ctx.fillStyle = v.color;
            ctx.beginPath(); ctx.arc(v.x, v.y, v.size, 0, Math.PI*2); ctx.fill();
            v.x += v.vx; v.y += v.vy; v.life--;
            if (v.life <= 0) visuals.splice(i, 1);
        }
    });


    if (gameState !== 'START') { 
        player.draw(); 
        projectiles.forEach(p => p.draw()); 
        enemies.forEach(e => e.draw()); 
        drawHUD(); 
    }
    ctx.restore();
}



shopBtnHUD.onclick = () => { if (gameState === 'PLAYING') { gameState = 'SHOP'; shopScreen.style.display = 'flex'; renderHub(); } };

testBtnHUD.onclick = () => { startTestMode(); };
pauseBtnHUD.onclick = () => { togglePause(); };
closeShopBtn.onclick = () => { gameState = 'PLAYING'; shopScreen.style.display = 'none'; };

function togglePause() {
    if (gameState === 'PLAYING') {
        gameState = 'PAUSED';
        pauseBtnHUD.innerText = 'RESUME';
    } else if (gameState === 'PAUSED') {
        gameState = 'PLAYING';
        pauseBtnHUD.innerText = 'PAUSE';
    }
}

function loop() { 
    if (gameState !== 'PAUSED' && gameState !== 'SHOP') update(); 
    draw(); 
    
    if (gameState === 'PAUSED') {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, 600, 1000);
        ctx.fillStyle = "#fff";
        ctx.font = "900 40px Inter";
        ctx.textAlign = "center";
        ctx.fillText("SYSTEM PAUSED", 300, 500);
    }
    
    requestAnimationFrame(loop); 
}

document.getElementById('startBtn').onclick = startGame;
document.getElementById('restartBtn').onclick = startGame;
window.onload = loop; loop();

supernovaBtn.onclick = () => { if (gameState === 'PLAYING' && player) player.activateSupernova(); };
