/**
 * Royal Wedding Invitation - Aditi & Rahul
 * Complete Interactive Experience
 */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var root = document.documentElement;

    /* ==========================================================================
       1. Background Music Player (Jashn-e-bahara Instrumental)
       ========================================================================== */
    var audio = new Audio();
    audio.src = 'media/music/Jashn-e-bahara Instrumental.mp3';
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'none';

    var musicBtn = document.getElementById('musicToggle');
    var isPlaying = false;

    function updateMusicUI() {
        if (!musicBtn) return;
        if (isPlaying) {
            musicBtn.classList.remove('is-muted');
            musicBtn.setAttribute('aria-label', 'Mute background music');
        } else {
            musicBtn.classList.add('is-muted');
            musicBtn.setAttribute('aria-label', 'Play background music');
        }
    }

    function toggleMusic() {
        if (!isPlaying) {
            audio.play().then(function () {
                isPlaying = true;
                updateMusicUI();
            }).catch(function (err) {
                console.log('Audio play blocked:', err);
            });
        } else {
            audio.pause();
            isPlaying = false;
            updateMusicUI();
        }
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }

    /* ==========================================================================
       2. Royal Gate Opening Sequence
       ========================================================================== */
    var gate = document.getElementById('ryGate');
    var video = document.getElementById('ryHeroVideo');
    var gateFinished = false;

    function finishGate() {
        if (gateFinished) return;
        gateFinished = true;
        if (gate) {
            gate.hidden = true;
        }
        var couple = document.getElementById('ryCouple');
        if (couple) couple.focus({ preventScroll: true });
    }

    function openGate() {
        if (root.classList.contains('is-open')) return;
        root.classList.add('is-open');
        if (gate) gate.setAttribute('aria-disabled', 'true');
        window.scrollTo(0, 0);

        // Start video playback on phones
        if (video) {
            video.src = video.getAttribute('data-src') || 'media/garden_palace.mp4';
            video.load();
            video.play().catch(function () {});
        }

        // Auto-play music on the first user interaction (gate tap)
        if (!isPlaying) {
            toggleMusic();
        }

        if (gate) {
            gate.addEventListener('animationend', function (e) {
                if (['ry-flap-bottom', 'ry-flap-right', 'ry-gate-fade'].indexOf(e.animationName) !== -1) {
                    finishGate();
                }
            });
        }
        window.setTimeout(finishGate, 4500);
    }

    if (gate) {
        gate.addEventListener('wheel', function (e) { e.preventDefault(); }, { passive: false });
        gate.addEventListener('click', openGate);
        gate.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openGate();
            }
        });
    }

    /* ==========================================================================
       3. Scroll Unrolling & Ceremony Cards Animation (IntersectionObserver)
       ========================================================================== */
    var scrolls = document.querySelectorAll('.royale-scroll');
    if ('IntersectionObserver' in window) {
        var scrollObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-unrolled');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        scrolls.forEach(function (el) {
            el.classList.add('is-armed');
            scrollObserver.observe(el);
        });
    } else {
        scrolls.forEach(function (el) {
            el.classList.add('is-unrolled');
        });
    }

    // Ceremony Cards Rise on Scroll
    var ceremonyCards = document.querySelectorAll('.ryc-card');
    if ('IntersectionObserver' in window) {
        var cardObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-shown');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        ceremonyCards.forEach(function (card, i) {
            card.classList.add('is-armed');
            card.style.setProperty('--i', i % 3);
            cardObserver.observe(card);
        });
    } else {
        ceremonyCards.forEach(function (card) {
            card.classList.add('is-shown');
        });
    }

    /* ==========================================================================
       4. Date Reveal Slot Dials (11 DEC 2026)
       ========================================================================== */
    var dateSection = document.getElementById('ryDateReveal');
    var revealBtn = document.getElementById('ryRevealBtn');
    var revealAfter = document.getElementById('ryRevealAfter');
    var revealSaid = document.getElementById('ryRevealSaid');
    var isRevealed = false;

    var MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    var targetDay = 11;
    var targetMonth = 12; // DEC
    var targetYear = 2026;

    function cell(val) {
        return '<span class="royale-date__cell">' + val + '</span>';
    }

    function pad(n) {
        return n < 10 ? '0' + n : String(n);
    }

    function rollDial(name, cells, loops, duration) {
        if (!dateSection) return;
        var plaque = dateSection.querySelector('[data-dial="' + name + '"]');
        var strip = plaque && plaque.querySelector('[data-strip]');
        if (!strip) return;

        var seq = [''];
        for (var l = 0; l < loops; l++) seq = seq.concat(cells.all);
        seq = seq.concat(cells.all.slice(0, cells.index + 1));

        strip.innerHTML = seq.map(cell).join('');
        strip.style.transition = 'none';
        strip.style.transform = 'translateY(0)';
        void strip.offsetHeight; // force reflow

        strip.style.transition = 'transform ' + duration + 'ms cubic-bezier(0.16, 1, 0.3, 1)';
        strip.style.transform = 'translateY(calc(' + (-(seq.length - 1)) + ' * var(--cell-h)))';
    }

    function launchConfetti() {
        if (!dateSection) return;
        var stage = dateSection.querySelector('.royale-date__stage');
        var elephants = dateSection.querySelectorAll('.royale-date__elephant');
        if (!stage || !elephants.length) return;

        var layer = document.createElement('div');
        layer.className = 'royale-date__confetti';
        layer.setAttribute('aria-hidden', 'true');
        stage.appendChild(layer);

        var box = stage.getBoundingClientRect();
        var unit = box.width / 100;
        var BEADS = ['media/confetti1.svg', 'media/confetti2.svg', 'media/confetti3.svg'];

        Array.prototype.forEach.call(elephants, function (el) {
            var r = el.getBoundingClientRect();
            var isLeft = el.classList.contains('royale-date__elephant--left');
            var x = r.left - box.left + r.width * (isLeft ? 0.42 : 0.58);
            var y = r.top - box.top + r.height * 0.08;

            for (var i = 0; i < 24; i++) {
                var flake = document.createElement('i');
                var arc = document.createElement('i');
                var bead = document.createElement('img');
                var rand = function (lo, hi) { return lo + Math.random() * (hi - lo); };

                flake.className = 'ryd-flake';
                arc.className = 'ryd-flake__arc';
                bead.src = BEADS[Math.floor(Math.random() * BEADS.length)];
                bead.alt = '';

                var w = rand(1.6, 3.1) * unit;
                bead.style.width = w + 'px';
                bead.style.height = w + 'px';

                flake.style.left = x + 'px';
                flake.style.top = y + 'px';
                flake.style.setProperty('--travel', (rand(12, 34) * (isLeft ? 1 : -1) * unit).toFixed(1) + 'px');
                flake.style.setProperty('--rise', (-rand(14, 32) * unit).toFixed(1) + 'px');
                flake.style.setProperty('--fall', (rand(12, 32) * unit).toFixed(1) + 'px');
                flake.style.setProperty('--rot', (rand(-540, 540) | 0) + 'deg');
                flake.style.setProperty('--dur', rand(2200, 3200).toFixed(0) + 'ms');
                flake.style.setProperty('--delay', rand(0, 380).toFixed(0) + 'ms');

                arc.appendChild(bead);
                flake.appendChild(arc);
                layer.appendChild(flake);
            }
        });

        window.setTimeout(function () {
            if (layer.parentNode) layer.parentNode.removeChild(layer);
        }, 4000);
    }

    function runDateReveal() {
        if (isRevealed || !dateSection) return;
        isRevealed = true;

        dateSection.classList.add('is-revealing');
        if (revealBtn) {
            revealBtn.classList.add('is-pressed');
            revealBtn.disabled = true;
            window.setTimeout(function () { revealBtn.classList.remove('is-pressed'); }, 180);
        }

        // Build data sets
        var daysList = [];
        for (var d = 1; d <= 31; d++) daysList.push(pad(d));
        var dayCells = { all: daysList, index: targetDay - 1 };

        var monthCells = { all: MONTHS.slice(), index: targetMonth - 1 };

        var yearsList = ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'];
        var yearCells = { all: yearsList, index: yearsList.indexOf(String(targetYear)) };

        rollDial('day', dayCells, 2, 1750);
        rollDial('month', monthCells, 2, 2250);
        rollDial('year', yearCells, 2, 2750);

        window.setTimeout(function () {
            launchConfetti();
            // Knock hop on plaques
            ['day', 'month', 'year'].forEach(function (name, i) {
                var p = dateSection.querySelector('[data-dial="' + name + '"]');
                if (p) {
                    window.setTimeout(function () {
                        p.classList.add('is-set');
                        window.setTimeout(function () { p.classList.remove('is-set'); }, 420);
                    }, 90 + i * 90);
                }
            });
        }, 2750);

        window.setTimeout(function () {
            dateSection.classList.remove('is-revealing');
            dateSection.classList.add('is-revealed');
            if (revealAfter) revealAfter.hidden = false;
            if (revealSaid) revealSaid.textContent = '11 December 2026';
        }, 2750 + 420);
    }

    if (revealBtn) {
        revealBtn.addEventListener('click', runDateReveal);
    }

    /* ==========================================================================
       5. 3D Rope Hanging Gallery (Pendulum Physics & Drag)
       ========================================================================== */
    var scroller = document.getElementById('ryGalleryScroll');
    if (scroller) {
        var frames = Array.prototype.map.call(scroller.querySelectorAll('.gframe'), function (el, i) {
            var hang = parseFloat(el.style.getPropertyValue('--hang')) || 110;
            return {
                el: el,
                body: el.querySelector('.gframe__body'),
                angle: 0,
                vel: 0,
                yaw: 0,
                yawVel: 0,
                stiffness: 0.02 * (130 / (hang + 90)),
                damping: 0.93 + (i % 3) * 0.01,
                gain: 0.55 + ((i * 7) % 5) * 0.08,
                idleAmp: 0.5 + (i % 2) * 0.35,
                idleYawAmp: 6 + (i % 3) * 1.5,
                idleFreq: 0.4 + ((i * 3) % 4) * 0.1,
                idlePhase: i * 1.7,
                last: '',
                lastYaw: ''
            };
        });

        var MAX_ANGLE = 20;
        var MAX_YAW = 26;
        var lastScroll = scroller.scrollLeft;
        var vSmooth = 0;
        var rafId = null;
        var inView = false;

        function galleryStep(now) {
            var t = now / 1000;
            var sl = scroller.scrollLeft;
            vSmooth += ((sl - lastScroll) - vSmooth) * 0.35;
            lastScroll = sl;

            frames.forEach(function (f) {
                var equil = Math.min(MAX_ANGLE, Math.max(-MAX_ANGLE, vSmooth * 0.85 * f.gain));
                f.vel += (equil - f.angle) * f.stiffness;
                f.vel *= f.damping;
                f.angle += f.vel;

                var yawEquil = Math.min(MAX_YAW, Math.max(-MAX_YAW, -vSmooth * 1.1 * f.gain));
                f.yawVel += (yawEquil - f.yaw) * f.stiffness * 1.4;
                f.yawVel *= f.damping;
                f.yaw += f.yawVel;

                var idle = Math.sin(t * f.idleFreq + f.idlePhase) * f.idleAmp;
                var idleYaw = Math.sin(t * f.idleFreq * 0.8 + f.idlePhase + 1.3) * f.idleYawAmp;

                var next = 'rotate(' + (f.angle + idle).toFixed(3) + 'deg)';
                if (next !== f.last) {
                    f.el.style.transform = next;
                    f.last = next;
                }
                var nextYaw = 'rotateY(' + (f.yaw + idleYaw).toFixed(2) + 'deg)';
                if (f.body && nextYaw !== f.lastYaw) {
                    f.body.style.transform = nextYaw;
                    f.lastYaw = nextYaw;
                }
            });

            rafId = requestAnimationFrame(galleryStep);
        }

        function startGallery() {
            if (rafId !== null) return;
            lastScroll = scroller.scrollLeft;
            vSmooth = 0;
            rafId = requestAnimationFrame(galleryStep);
        }

        function stopGallery() {
            if (rafId === null) return;
            cancelAnimationFrame(rafId);
            rafId = null;
        }

        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                inView = entries[0].isIntersecting;
                if (inView) startGallery(); else stopGallery();
            }, { rootMargin: '200px 0px' }).observe(scroller);
        } else {
            startGallery();
        }

        // Hide hint
        var galleryHint = document.getElementById('ryGalleryHint');
        if (galleryHint) {
            scroller.addEventListener('scroll', function () {
                if (scroller.scrollLeft > 10) {
                    galleryHint.classList.add('is-hidden');
                }
            }, { passive: true });
        }

        // Pointer / mouse dragging
        var isDragging = false;
        var dragStartX = 0;
        var dragScrollLeft = 0;

        scroller.addEventListener('pointerdown', function (e) {
            if (e.pointerType !== 'mouse') return;
            isDragging = true;
            dragStartX = e.clientX;
            dragScrollLeft = scroller.scrollLeft;
            scroller.classList.add('is-dragging');
            scroller.setPointerCapture(e.pointerId);
        });

        scroller.addEventListener('pointermove', function (e) {
            if (!isDragging) return;
            scroller.scrollLeft = dragScrollLeft - (e.clientX - dragStartX);
        });

        function endDrag(e) {
            if (!isDragging) return;
            isDragging = false;
            scroller.classList.remove('is-dragging');
            try { scroller.releasePointerCapture(e.pointerId); } catch (_) {}
        }

        scroller.addEventListener('pointerup', endDrag);
        scroller.addEventListener('pointercancel', endDrag);
    }

    /* ==========================================================================
       6. Interactive RSVP Form
       ========================================================================== */
    var rsvpForm = document.getElementById('rsvpForm');
    var peopleCountInput = document.getElementById('rsvpGuestCount');
    var peopleMinusBtn = document.getElementById('rsvpPeopleMinus');
    var peoplePlusBtn = document.getElementById('rsvpPeoplePlus');
    var rsvpSuccessBox = document.getElementById('rsvpSuccess');
    var rsvpChangeBtn = document.getElementById('rsvpChangeBtn');

    if (peopleMinusBtn && peoplePlusBtn && peopleCountInput) {
        peopleMinusBtn.addEventListener('click', function () {
            var val = parseInt(peopleCountInput.value, 10) || 1;
            if (val > 1) peopleCountInput.value = val - 1;
        });
        peoplePlusBtn.addEventListener('click', function () {
            var val = parseInt(peopleCountInput.value, 10) || 1;
            if (val < 10) peopleCountInput.value = val + 1;
        });
    }

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = document.getElementById('rsvpName').value.trim();
            var phone = document.getElementById('rsvpContact').value.trim();
            var count = peopleCountInput ? peopleCountInput.value : 1;
            var message = document.getElementById('rsvpMessage').value.trim();

            if (!name) {
                alert('Please enter your name.');
                return;
            }

            var cleanPhone = phone.replace(/\D+/g, '');
            if (cleanPhone.length < 10) {
                alert('Please enter a valid 10-digit contact number.');
                return;
            }

            // Gather ceremony responses
            var responses = {};
            var events = ['mehendi', 'haldi', 'sangeet', 'vivaah', 'reception'];
            events.forEach(function (evName) {
                var selected = rsvpForm.querySelector('input[name="status_' + evName + '"]:checked');
                responses[evName] = selected ? selected.value : 'attending';
            });

            // Save locally
            try {
                var rsvpData = {
                    date: new Date().toISOString(),
                    name: name,
                    phone: phone,
                    guestCount: count,
                    responses: responses,
                    message: message
                };
                var existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
                existing.push(rsvpData);
                localStorage.setItem('wedding_rsvps', JSON.stringify(existing));
            } catch (err) {}

            // Show success screen
            rsvpForm.hidden = true;
            if (rsvpSuccessBox) {
                rsvpSuccessBox.hidden = false;
                var summaryList = document.getElementById('rsvpSummaryList');
                if (summaryList) {
                    var labels = { attending: 'Attending', maybe: 'Maybe', 'not-attending': 'Not Attending' };
                    summaryList.innerHTML =
                        '<li><strong>Mehendi:</strong> ' + labels[responses.mehendi] + '</li>' +
                        '<li><strong>Haldi:</strong> ' + labels[responses.haldi] + '</li>' +
                        '<li><strong>Sangeet:</strong> ' + labels[responses.sangeet] + '</li>' +
                        '<li><strong>Vivaah:</strong> ' + labels[responses.vivaah] + '</li>' +
                        '<li><strong>Reception:</strong> ' + labels[responses.reception] + '</li>';
                }
            }
        });
    }

    if (rsvpChangeBtn) {
        rsvpChangeBtn.addEventListener('click', function () {
            if (rsvpSuccessBox) rsvpSuccessBox.hidden = true;
            if (rsvpForm) rsvpForm.hidden = false;
        });
    }

    /* ==========================================================================
       7. Social Modals (Location & Calendar)
       ========================================================================== */
    var modal = document.getElementById('ryModal');
    var modalContent = document.getElementById('ryModalContent');
    var locBtn = document.getElementById('ryLocBtn');
    var calBtn = document.getElementById('ryCalBtn');
    var igBtn = document.getElementById('ryIgBtn');

    function closeModal() {
        if (modal) modal.hidden = true;
    }

    if (modal) {
        modal.querySelectorAll('[data-ry-close]').forEach(function (el) {
            el.addEventListener('click', closeModal);
        });
    }

    if (locBtn && modalContent) {
        locBtn.addEventListener('click', function () {
            modalContent.innerHTML =
                '<h3 style="font-family: \'Cormorant Garamond\', serif; font-size: 26px; margin: 0 0 16px; color: #380015;">Ceremony Venues</h3>' +
                '<ul style="list-style: none; padding: 0; margin: 0; line-height: 1.6; text-align: left;">' +
                '<li style="margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid rgba(0,0,0,0.08);">' +
                '<strong>Sharma Residence</strong><br><span style="font-size: 13px; color: #666;">Jaipur, Rajasthan</span><br>' +
                '<a href="https://maps.google.com/?q=Sharma+Residence+Jaipur" target="_blank" style="color: #8b0028; text-decoration: underline; font-size: 13px;">View on Google Maps ↗</a>' +
                '</li>' +
                '</ul>';
            modal.hidden = false;
        });
    }

    if (calBtn && modalContent) {
        calBtn.addEventListener('click', function () {
            var gcalUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Celebration&dates=20261211T143000Z/20261211T183000Z&details=Wedding+ceremony&location=Sharma+Residence,+Jaipur';
            modalContent.innerHTML =
                '<h3 style="font-family: \'Cormorant Garamond\', serif; font-size: 26px; margin: 0 0 16px; color: #380015;">Add to Calendar</h3>' +
                '<p style="font-size: 14px; color: #555; margin-bottom: 20px;">Save the auspicious wedding date to your calendar:</p>' +
                '<a href="' + gcalUrl + '" target="_blank" style="display: block; padding: 12px 20px; background: #380015; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; text-align: center; margin-bottom: 10px;">Google Calendar</a>';
            modal.hidden = false;
        });
    }

    if (igBtn) {
        igBtn.addEventListener('click', function () {
            alert('Hashtag: #AditiRahulWedding2026');
        });
    }

    /* ==========================================================================
       8. Lenis Smooth Scroll
       ========================================================================== */
    if (typeof Lenis !== 'undefined') {
        var lenis = new Lenis({
            duration: 1.2,
            easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
            smoothWheel: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }
});
