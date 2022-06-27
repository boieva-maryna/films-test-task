export interface Credit {
  plprogram$creditType: string;
  plprogram$personId: string;
  plprogram$personName: string;
}

export interface Thumbnails {
  [size: string]: {
    plprogram$url: string;
    plprogram$width: number;
    plprogram$height: number;
  };
}

export interface Tag {
  plprogram$scheme: string;
  plprogram$title: string;
  plprogram$titleLocalized: {
    en?: string;
  };
}

export interface Film {
  id:string;
  guid: string;
  updated: number;
  title: string;
  description: string;
  plprogram$credits: Credit[];
  plprogram$longDescription: string;
  plprogram$programType: number;
  plprogram$pubDate: string;
  plprogram$runtime: number;
  plprogram$tags: Tag[];
  plprogram$thumbnails: Thumbnails;
  plprogram$year: number;
  tdc$youtubeTrailer: string;
}
