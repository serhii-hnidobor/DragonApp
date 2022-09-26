type DragonResponseDto = {
  name: string;
  flickr_images: string[];
  wikipedia: string;
  dry_mass_lb: number;
  dry_mass_kg: number;
  launch_payload_mass: number;
  return_payload_mass: number;
  first_flight: string;
};

export type { DragonResponseDto };
