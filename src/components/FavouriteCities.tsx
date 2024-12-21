
import { useFavourite } from '@/hooks/useFavourite'
import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area'
import FavouriteCityTablet from './FavouriteCityTablet'

const FavouriteCities = () => {
    const {favourites, removeFavourite} = useFavourite()

    if (!favourites.length) return null

    return (
        <>
            <h1 className='text-3xl font-bold tracking-tight'>Favourites</h1>
            <ScrollArea className='pb-4 w-full'>
                <div className='flex gap-4'>
                    {favourites.map((city) => {
                        return (
                            <FavouriteCityTablet 
                                key={city.id} 
                                {...city}
                                onRemove={() => removeFavourite.mutate(city.id)} 
                            />
                        ) 
                    })}
                </div>
                <ScrollBar orientation="horizontal" className="mt-2" />
            </ScrollArea>
        </>
    )
}


export default FavouriteCities
