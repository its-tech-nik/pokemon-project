import { describe, it, expect, vi, afterEach } from 'vitest'
import { isFavourite } from './isFavourite'
import { loadState } from "./loadState"

const mocks = vi.hoisted(() => {
    return {
        loadState: vi.fn(),
    }
})
  
vi.mock('./loadState', () => {
    return {
        loadState: mocks.loadState,
    }
})
describe('isFavourite', () => {
    afterEach(() => {
        vi.clearAllMocks()
    })

    it('should return false if there arent any favourite pokemons', () => {
        vi.mocked(loadState).mockReturnValue(null)

		expect(isFavourite('example-pokemon')).toBe(false)
    })

    it('should return false if the selected pokemon is not in the list of favourite pokemons', () => {
        vi.mocked(loadState).mockReturnValue(['example-not-pokemon'])

		expect(isFavourite('example-pokemon')).toBe(false)
    })

    it('should return false if there are no favourite pokemons', () => {
        vi.mocked(loadState).mockReturnValue(['example-pokemon'])

		expect(isFavourite('example-pokemon')).toBe(true)
    })
});
