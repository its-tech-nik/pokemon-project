import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { loadState } from './loadState'
import * as exports from '$app/environment'

describe('loadState', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    afterEach(() => {
        vi.restoreAllMocks
    })

    it('should return null if loadState is run on server side', () => {
        vi.spyOn(exports, 'browser', 'get').mockReturnValue(false)

		expect(loadState()).toBe(null)
    })

	it('should return null if it is not set in localStorage', () => {
        vi.spyOn(exports, 'browser', 'get').mockReturnValue(true)

        expect(loadState()).toStrictEqual(null)
	});

	it('should return "example-token" if it is set in localStorage', () => {
        localStorage.setItem('jabbr::starred_pokemons', JSON.stringify(['example-pokemon']))

        vi.spyOn(exports, 'browser', 'get').mockReturnValue(true)

        expect(loadState()).toStrictEqual(['example-pokemon'])
	});

	// it('should return true if "example-token" is in localStorage', () => {
    //     const spy = vi.spyOn(isFavourite, 'browser')

    //     spy.mockImplementationOnce(true)

    //     localStorage.setItem('jabbr::starred_pokemons', JSON.stringify(['example-pokemon']))
	// 	expect(isFavourite('example-pokemon')).toBe(true)
	// });
});
