// Import the core angular services.
import { InjectionToken } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';

// Import the application components and services.
import { NGXPixiService } from './ngxpixi.service';
import { NGXPixiServiceOptions } from './ngxpixi.service';

import { PixiService } from './providers/pixi.service';
import { AssetService } from './providers/asset.service';

import { SpriteComponent } from './components/sprite/sprite.component';
import { FilterComponent } from './components/filters/filters.component';
import { MenuComponent } from './components/menu/menu.component';

import { FilterDirective } from './components/filters/filters.directive';

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Re-export services, treating the module like a "barrel".
export { NGXPixiService };
export { NGXPixiServiceOptions };

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
  declarations: [
    SpriteComponent,
    FilterComponent,
    FilterDirective,
    MenuComponent,
  ],
  imports: [
  ],
  exports: [
    SpriteComponent,
    FilterComponent,
    FilterDirective,
    MenuComponent,
  ],
  providers: [
    AssetService,
    PixiService
  ]
})
export class PixiModule {

  // I setup the module providers for the root application.
  static forRoot( options?: ModuleOptions ): ModuleWithProviders {

    return({
      ngModule: PixiModule,
      providers: [
        // In order to translate the raw, optional OPTIONS argument into an
        // instance of the MyServiceOptions TYPE, we have to first provide it as
        // an injectable so that we can inject it into our FACTORY FUNCTION.
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: options
        },
        // Once we've provided the OPTIONS as an injectable, we can use a FACTORY
        // FUNCTION to then take that raw configuration object and use it to
        // configure an instance of the MyServiceOptions TYPE (which will be
        // implicitly consumed by the MyService constructor).
        {
          provide: NGXPixiServiceOptions,
          useFactory: provideMyServiceOptions,
          deps: [ FOR_ROOT_OPTIONS_TOKEN ]
        }

        // NOTE: We don't have to explicitly provide the MyService class here
        // since it will automatically be picked-up using the "providedIn"
        // Injectable() meta-data.
      ]
    });

  }

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I define the shape of the optional configuration data passed to the forRoot() method.
export interface ModuleOptions {
  retryCount?: number;
  retryInterval?: number;
  filters?: boolean;
  projection?: boolean;
  spine?: boolean;
  sound?: boolean;
  layers?: boolean;
  compressedTextures?: boolean;
}

// I am the token that makes the raw options available to the following factory function.
// --
// NOTE: This value has to be exported otherwise the AoT compiler won't see it.
export let FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<ModuleOptions>( 'forRoot() NGXPixiService configuration.' );

// I translate the given raw OPTIONS into an instance of the MyServiceOptions TYPE. This
// will allows the MyService class to be instantiated and injected with a fully-formed
// configuration class instead of having to deal with the Inject() meta-data and a half-
// baked set of configuration options.
// --
// NOTE: This value has to be exported otherwise the AoT compiler won't see it.
export function provideMyServiceOptions( options?: ModuleOptions ): NGXPixiServiceOptions {

  const ngxPixiServiceOptions = new NGXPixiServiceOptions();

  // If the optional options were provided via the .forRoot() static method, then apply
  // them to the MyServiceOptions Type provider.
  if ( options ) {

    if ( typeof( options.retryCount ) === 'number' ) {

      ngxPixiServiceOptions.retryCount = options.retryCount;

    }

    if ( typeof( options.retryInterval ) === 'number' ) {

      ngxPixiServiceOptions.retryInterval = options.retryInterval;

    }

    if ( typeof( options.filters ) === 'boolean' ) {
      ngxPixiServiceOptions.filters = options.filters;
    }
    if ( typeof( options.projection ) === 'boolean' ) {
      ngxPixiServiceOptions.projection = options.projection;
    }
    if ( typeof( options.spine ) === 'boolean' ) {
      ngxPixiServiceOptions.spine = options.spine;
    }
    if ( typeof( options.sound ) === 'boolean' ) {
      ngxPixiServiceOptions.sound = options.sound;
    }
    if ( typeof( options.layers ) === 'boolean' ) {
      ngxPixiServiceOptions.layers = options.layers;
    }
    if ( typeof( options.compressedTextures ) === 'boolean' ) {
      ngxPixiServiceOptions.compressedTextures = options.compressedTextures;
    }

  }

  return( ngxPixiServiceOptions );

}

// NOTE: this forRoot is from http://bennadel.com/blog/2498-Lazy-Loading-Image-With-AngularJS.htm
