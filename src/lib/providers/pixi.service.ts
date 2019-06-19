import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as PIXI from 'pixi.js';

/*
  Generated class for the Pixi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PixiService {
  loader = new PIXI.Loader();
  app: PIXI.Application;

  ratio = 0;
  starting_width = 0;
  starting_width_of_window = 0;
  starting_height = 0;
  starting_height_of_window = 0;

  renderer: any;
  worldStage: any;
  time = 0;
  last_time = 0;

  anim_loop_callbacks = [];
  to_render = [];

  constructor() { }

  animate(t) {
    const self = this;
    this.time = new Date().getTime() / 1000;

    const deltaTime = this.time - this.last_time;

    if (typeof this.worldStage != 'undefined') {
      if (this.worldStage) {
        for (const s in this.to_render) { this.to_render[s].update(deltaTime); }

        for (const c in this.anim_loop_callbacks) { this.anim_loop_callbacks[c](); }

        this.renderer.render(this.worldStage);
      }
    }
    this.last_time = this.time;

    requestAnimationFrame(t => {
      self.animate(t);
    });
  }

  appendRenderer(id) {
    // Add canvas to page
    const el = document.getElementById(id);

    if (el) { el.appendChild(this.renderer.view); }
  }

  sizeCollection(el, args) {
    // Get current ratio
    const ratio = this.renderer.width / this.renderer.height;

    // Get current width
    const old_w = this.renderer.width;

    let w = el.width();

    // Get new width
    if (typeof args != 'undefined') { w = args.width; }

    // Resize to match width
    const perChange = this.worldStage.scale.x * ((old_w - w) / old_w);
    this.renderer.resize(w, window.innerHeight);

    // Scale Stage based on % change of screen width
    this.worldStage.scale.x -= this.worldStage.scale.x * ((old_w - w) / old_w);
    this.worldStage.scale.y = this.worldStage.scale.x;
  }

  init(width, height, el, autoResize, resizeElement) {

    const options = {
      width,
      height,
      transparent: true,
      antialias: true,
      view: el
    };

    if (autoResize) {
      options['resizeTo'] = resizeElement;
    }
    // Initialize game container
    this.app = new PIXI.Application(options);

    this.renderer = this.app.renderer;
    this.renderer.resolution = window.devicePixelRatio;
    // this.renderer.rootRenderTarget.resolution = window.devicePixelRatio;
    this.renderer.resize(width - 1, height);
    this.renderer.resize(
      width,
      height
    );
    this.renderer.plugins.interaction.resolution = window.devicePixelRatio;

    this.worldStage = new PIXI.Container();

    // Initialize game camera
    const w = this.renderer.width;
    const h = this.renderer.height;

    this.ratio = w / h;
    this.starting_width = w;
    this.starting_width_of_window = w / window.innerWidth;
    this.starting_height = h;
    this.starting_height_of_window = h / window.innerHeight;

    this.animate(0);
  }
}
