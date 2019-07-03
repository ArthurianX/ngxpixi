
// Import the core angular services.
import { Injectable } from '@angular/core';

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
  providedIn: 'root'
})
export class NGXPixiServiceOptions {

  public retryCount = 6;
  public retryInterval = 2000;
  public filters = true;
  public projection = false;
  public spine = false;
  public sound = false;
  public layers = false;
  public compressedTextures = false;

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
  providedIn: 'root'
})
export class NGXPixiService {

  private options: NGXPixiServiceOptions;

  // I initialize the my-service service.
  constructor( options: NGXPixiServiceOptions ) {

    this.options = options;

    console.group( 'NGXPixiService Constructor' );
    console.log( 'Injected Options' );
    console.log( this.options );
    console.groupEnd();

  }

}
