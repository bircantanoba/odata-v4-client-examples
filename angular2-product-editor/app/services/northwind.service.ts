import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { JayStack, factory } from '../../jaydata-model/Northwind';
import "jaydata/odata";


@Injectable( )
export class NorthwindService
{
    private context: JayStack.NorthwindContext;
    private subject: Subject<JayStack.NorthwindContext>;
    
    private config = {
        provider: 'oData',
        oDataServiceHost: "http://localhost:3000/odata"
    };

    constructor( )
    {
        this.subject = new Subject( );

        factory( this.config )
        .onReady( )
        .then( context => this.onReady( context ) );
    }

    getContext( setContext:( context: JayStack.NorthwindContext )=>void )
    {
        if( this.context )
        {
            setContext( this.context );
        }
        else
        {
            this.subject.subscribe( setContext );
        }
    }

    private onReady( context: JayStack.NorthwindContext )
    {
        this.context = context;
        this.subject.next( this.context );
        this.subject.complete( );
    }
}