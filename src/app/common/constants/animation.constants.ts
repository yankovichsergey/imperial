import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
  query,
  group,
} from '@angular/animations';

export const FADE_IN_CONTENT_BY_HEIGHT: AnimationTriggerMetadata = trigger('fadeInContentByHeight', [
  transition(':enter', [
    style({ height: '0px' }),
    animate('300ms', style({ height: '*' }))
  ]),
  transition(':leave', [
    style({ height: '*' }),
    animate('300ms', style({ height: '0px' }))
  ])
]);

export const FADE_IN_CONTENT_BY_HEIGHT_OPACITY: AnimationTriggerMetadata = trigger('fadeInContentByHeightOpacity', [
  transition(':enter', [
    style({ opacity: 0, height: '0px', 'padding-top': '0px', 'padding-bottom': '0px' }),
    animate('300ms', style({ opacity: 1, height: '*', 'padding-top': '*', 'padding-bottom': '*' }))
  ]),
  transition(':leave', [
    style({ opacity: 1, height: '*', 'padding-top': '*', 'padding-bottom': '*' }),
    animate('300ms', style({ opacity: 0, height: '0px', 'padding-top': '0px', 'padding-bottom': '0px' }))
  ])
]);


export const FADE_IN_CONTENT_BY_OPACITY_ONE_WAY: AnimationTriggerMetadata = trigger('fadeInContentByOpacityOneWay', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('0ms', style({ opacity: 0 }))
  ])
]);

export const FADE_IN_CONTENT_BY_OPACITY: AnimationTriggerMetadata = trigger('fadeInContentByOpacity', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('300ms', style({ opacity: 0 }))
  ])
]);

export const FADE_IN_CONTENT_SLIDER: AnimationTriggerMetadata = trigger('fadeInContentSlider', [
  transition(':enter', [
    style({ opacity: 0, right: '-100%' }),
    animate('300ms', style({ opacity: 1, right: 0 }))
  ]),
  transition(':leave', [
    style({ opacity: 1, right: 0 }),
    animate('300ms', style({ opacity: 0, right: '-100%' }))
  ])
]);

export const FADE_IN_CONTENT_BY_HEIGHT_FOR_HIDDEN: AnimationTriggerMetadata = trigger('fadeInContentByHeightForHidden',
  [
    state('visible', style({
      height: '*',
      marginTop: '*',
      marginBottom: '*'
    })),
    state('hidden', style({
      height: '0px',
      marginTop: '0px',
      marginBottom: '0px'
    })),
    transition('visible => hidden', animate(300)),
    transition('hidden => visible', animate(300)),
    transition('void => hidden', animate(0))
  ]);

export const FADE_IN_CONTENT_BY_HEIGHT_OPACITY_FOR_HIDDEN: AnimationTriggerMetadata = trigger('fadeInContentByHeightOpacityForHidden',
  [
    state('visible', style({
      height: '*', opacity: 1, padding: '*', margin: '*'
    })),
    state('hidden', style({
      height: '0px', opacity: 0, padding: '0px', margin: '0px'
    })),
    transition('visible => hidden', animate(300)),
    transition('hidden => visible', animate(300)),
    transition('void => hidden', animate(0))
  ]);

export const ROTATE_180: AnimationTriggerMetadata = trigger('rotateBlock', [
  state('down', style({
    transform: 'rotate(180deg)'
  })),
  state('up', style({
    transform: 'rotate(0deg)'
  })),
  transition('up => down', animate(300)),
  transition('down => up', animate(300)),
  transition('void => up', animate(0)),
]);

export const ROTATE_180_INVERSE: AnimationTriggerMetadata = trigger('rotateBlock180Inverse', [
  state('down', style({
    transform: 'rotate(0deg)'
  })),
  state('up', style({
    transform: 'rotate(180deg)'
  })),
  transition('up => down', animate(300)),
  transition('down => up', animate(300)),
  transition('void => up', animate(0)),
]);

export const ROUTER_TRANSITION = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
      query(':enter', [style({ opacity: 0 }), animate('0.5s ease-in-out', style({ opacity: 1 }))], { optional: true }),
      query(':leave', [style({ opacity: 1 }), animate('0.5s ease-in-out', style({ opacity: 0 }))], { optional: true })
    ])
  ])
]);
