import { Renderer, ElementRef, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/take';
/**
 * The edges that the resize event were triggered on
 */
export interface Edges {
    top?: boolean | number;
    bottom?: boolean | number;
    left?: boolean | number;
    right?: boolean | number;
}
/**
 * The bounding rectangle of the resized element
 */
export interface BoundingRectangle {
    top: number;
    bottom: number;
    left: number;
    right: number;
    height?: number;
    width?: number;
}
/**
 * The `$event` object that is passed to the resize events
 */
export interface ResizeEvent {
    rectangle: BoundingRectangle;
    edges: Edges;
}
/**
 * An element placed inside a `mwlResizable` directive to be used as a drag and resize handle
 *
 * For example
 *
 * ```
 * <div mwlResizable>
 *   <div mwlResizeHandle [resizeEdges]="{bottom: true, right: true}"></div>
 * </div>
 * ```
 */
export declare class ResizeHandle {
    /**
     * The `Edges` object that contains the edges of the parent element that dragging the handle will trigger a resize on
     */
    resizeEdges: Edges;
    /**
     * @private
     */
    resizable: Resizable;
    /**
     * @private
     */
    private onMouseup(mouseX, mouseY);
    /**
     * @private
     */
    private onMousedown(mouseX, mouseY);
    /**
     * @private
     */
    private onMousemove(mouseX, mouseY);
}
/**
 * Place this on an element to make it resizable
 *
 * For example
 *
 * ```
 * <div mwlResizable [resizeEdges]="{bottom: true, right: true, top: true, left: true}" [enableGhostResize]="true"></div>
 * ```
 */
export declare class Resizable implements OnInit, AfterViewInit {
    private renderer;
    elm: ElementRef;
    /**
     * A function that will be called before each resize event. Return `true` to allow the resize event to propagate or `false` to cancel it
     */
    validateResize: Function;
    /**
     * The edges that an element can be resized from. Pass an object like `{top: true, bottom: false}`. By default no edges can be resized.
     */
    resizeEdges: Edges;
    /**
     * Set to `true` to enable a temporary resizing effect of the element in between the `resizeStart` and `resizeEnd` events.
     */
    enableGhostResize: boolean;
    /**
     * A snap grid that resize events will be locked to.
     *
     * e.g. to only allow the element to be resized every 10px set it to `{left: 10, right: 10}`
     */
    resizeSnapGrid: Edges;
    /**
     * Called when the mouse is pressed and a resize event is about to begin. `$event` is a `ResizeEvent` object.
     */
    resizeStart: EventEmitter<Object>;
    /**
     * Called as the mouse is dragged after a resize event has begun. `$event` is a `ResizeEvent` object.
     */
    resize: EventEmitter<Object>;
    /**
     * Called after the mouse is released after a resize event. `$event` is a `ResizeEvent` object.
     */
    resizeEnd: EventEmitter<Object>;
    /**
     * @private
     */
    mouseup: Subject<any>;
    /**
     * @private
     */
    mousedown: Subject<any>;
    /**
     * @private
     */
    mousemove: Subject<any>;
    /**
     * @private
     */
    private resizeHandles;
    /**
     * @private
     */
    constructor(renderer: Renderer, elm: ElementRef);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    ngAfterViewInit(): void;
    /**
     * @private
     */
    private onMouseup(mouseX, mouseY);
    /**
     * @private
     */
    private onMousedown(mouseX, mouseY);
    /**
     * @private
     */
    private onMousemove(mouseX, mouseY);
}
