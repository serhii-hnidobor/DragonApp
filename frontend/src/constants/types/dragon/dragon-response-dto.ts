type DragonResponseDto = {
  id: string;
  name: string;
  flickr_images: string[];
  wikipedia: string;
  dry_mass_lb: number;
  dry_mass_kg: number;
  description: string;
  height_w_trunk: DragonResponseLengthUnitsType;
  launch_payload_mass: number;
  return_payload_mass: number;
  first_flight: string;
};

type DragonListResponseDto = {
  docs: DragonResponseDto[];
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

type DragonResponseLengthUnitsType = {
  meters: number;
  feet: number;
};

export type { DragonResponseDto, DragonListResponseDto };
