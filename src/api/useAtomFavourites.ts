import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback, useMemo } from 'react'
import { Film } from './types'

export const favouritesAtom = atomWithStorage<{[id:string]:Film}>('films-favourites', {})

const useFavourites =(film?:Film)=>{
    const [list, setList]=useAtom(favouritesAtom)

    const isMarked =useMemo(()=>!!film&&!!list[film?.guid],[list, film])

    const addFavourite=useCallback((film:Film)=>{
        list[film.guid]=film;
        setList({...list})
    },[list, setList])

     const deleteFavourite=useCallback((guid:string)=>{
        delete list[guid]
        setList({...list})
    },[list, setList])

    const onMark=useCallback(()=>{
        if(!film) return;

        if(isMarked){
            deleteFavourite(film.guid)
        }
        else{
            addFavourite(film)
        }
    },[isMarked,film, deleteFavourite, addFavourite])

    return {isMarked, onMark}
}

export default useFavourites