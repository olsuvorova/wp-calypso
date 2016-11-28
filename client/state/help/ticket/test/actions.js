/**
 * External dependencies
 */
import { assert } from 'chai';
import sinon from 'sinon';

/**
 * Internal dependencies
 */
import {
	ticketSupportConfigurationRequest,
	ticketSupportConfigurationRequestSuccess,
	ticketSupportConfigurationRequestFailure,
	ticketSupportConfigurationDismissError,
} from '../actions';

import {
	HELP_TICKET_CONFIGURATION_REQUEST,
	HELP_TICKET_CONFIGURATION_REQUEST_SUCCESS,
	HELP_TICKET_CONFIGURATION_REQUEST_FAILURE,
	HELP_TICKET_CONFIGURATION_DISMISS_ERROR,
} from 'state/action-types';

import { dummyConfiguration, dummyError } from './test-data';

import { useNock } from 'test/helpers/use-nock';
import { useSandbox } from 'test/helpers/use-sinon';

describe( 'ticket-support/configuration actions', () => {
	let spy;
	useSandbox( ( sandbox ) => spy = sandbox.spy() );

	describe( '#ticketSupportConfigurationRequestSuccess', () => {
		it( 'should return HELP_TICKET_CONFIGURATION_REQUEST_SUCCESS', () => {
			const action = ticketSupportConfigurationRequestSuccess( dummyConfiguration );

			assert.deepEqual( action, {
				type: HELP_TICKET_CONFIGURATION_REQUEST_SUCCESS,
				...dummyConfiguration,
			} );
		} );
	} );

	describe( '#ticketSupportConfigurationRequestFailure', () => {
		it( 'should return HELP_TICKET_CONFIGURATION_REQUEST_FAILURE', () => {
			const action = ticketSupportConfigurationRequestFailure( dummyError );

			assert.deepEqual( action, {
				type: HELP_TICKET_CONFIGURATION_REQUEST_FAILURE,
				error: dummyError,
			} );
		} );
	} );

	const apiUrl = 'https://public-api.wordpress.com:443';
	const endpoint = '/rest/v1.1/help/tickets/kayako/mine';

	describe( '#ticketSupportConfigurationRequest success', () => {
		useNock( ( nock ) => {
			nock( apiUrl )
				.get( endpoint )
				.reply( 200, dummyConfiguration );
		} );

		it( 'should be successful.', () => {
			const action = ticketSupportConfigurationRequest()( spy );

			assert( spy.calledWith( { type: HELP_TICKET_CONFIGURATION_REQUEST } ) );

			action.then( () => {
				assert( spy.calledWith( {
					type: HELP_TICKET_CONFIGURATION_REQUEST_SUCCESS,
					...dummyConfiguration,
				} ) );
			} );
		} );
	} );

	describe( '#ticketSupportConfigurationRequest failed', () => {
		useNock( ( nock ) => {
			nock( apiUrl )
				.get( endpoint )
				.reply( dummyError.status, dummyError );
		} );

		it( 'should be failed.', () => {
			const action = ticketSupportConfigurationRequest()( spy );

			assert( spy.calledWith( { type: HELP_TICKET_CONFIGURATION_REQUEST } ) );

			action.then( () => {
				assert( spy.calledWith( sinon.match( {
					type: HELP_TICKET_CONFIGURATION_REQUEST_FAILURE,
					error: dummyError,
				} ) ) );
			} );
		} );
	} );

	describe( '#ticketSupportConfigurationDismissError', () => {
		it( 'should return HELP_TICKET_CONFIGURATION_DISMISS_ERROR', () => {
			const action = ticketSupportConfigurationDismissError();

			assert.deepEqual( action, {
				type: HELP_TICKET_CONFIGURATION_DISMISS_ERROR,
			} );
		} );
	} );
} );
