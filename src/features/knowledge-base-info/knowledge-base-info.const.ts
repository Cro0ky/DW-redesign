import { IKnowledgeBaseInfoData } from "@/types/knowledge-base-info.types";

const tick_time = 1;

export const knowledgeBaseInfoData: IKnowledgeBaseInfoData[] = [
  {
    category: "basic_concepts",
    topics: [
      {
        title: "capture_the_flag_mode",
        description: "capture_the_flag_mode_description",
      },
      {
        title: "total_playing_time",
        description: "total_playing_time_description",
        data: { tick_time },
      },
      {
        title: "recharge_the_abilities_of_units",
        description: "recharge_the_abilities_of_units_description",
      },
      { title: "active_pause", description: "active_pause_description" },
      {
        title: "teams_of_players",
        description: "teams_of_players_description",
      },
      {
        title: "preparatory_course",
        description: "preparatory_course_description",
      },
      {
        title: "mechanics_of_the_sequence_of_moves",
        description: "mechanics_of_the_sequence_of_moves_description",
        data: { tick_time },
      },
      { title: "event_history", description: "event_history_description" },
      {
        title: "communication_channels",
        description: "communication_channels_description",
      },
    ],
  },
  {
    category: "stations",
    topics: [
      {
        title: "mobile_nsu",
        description: "mobile_nsu_description",
        data: {
          tick_activate: tick_time * 2,
          unloading_tick: tick_time,
        },
      },
      {
        title: "fake_nsu",
        description: "fake_nsu_description",
        data: {
          tick_time: Math.ceil(tick_time * 0.05),
        },
      },
      {
        title: "reb_station",
        description: "reb_station_description",
        data: {
          tick_activate: tick_time,
          unloading_tick: Math.ceil(tick_time / 2),
        },
      },
      {
        title: "frequency_scanner",
        description: "frequency_scanner_description",
        data: {
          tick_time: tick_time * 2,
          tick_activate: tick_time * 2,
          unloading_tick: Math.ceil(tick_time / 2),
        },
      },
    ],
  },
  {
    category: "infantry_and_pilots",
    topics: [
      {
        title: "scout_infantry",
        description: "scout_infantry_description",
        data: {
          moving_tick: tick_time,
          launch_tick: Math.ceil(tick_time / 2),
          reload_tick: tick_time * 2,
        },
      },
      {
        title: "lancet_infantry",
        description: "lancet_infantry_description",
        data: {
          moving_tick: tick_time,
          launch_tick: Math.ceil(tick_time / 2),
          reload_tick: tick_time * 2,
        },
      },
      {
        title: "fpv_infantry",
        description: "fpv_infantry_description",
        data: {
          moving_tick: tick_time,
          reload_tick: tick_time * 2,
        },
      },
      {
        title: "fpv_interceptor",
        description: "fpv_interceptor_description",
        data: {
          moving_tick: tick_time,
          reload_tick: tick_time * 2,
        },
      },
    ],
  },
  {
    category: "drones",
    topics: [
      {
        title: "long_range_drone",
        description: "long_range_drone_description",
        data: {
          moving_tick: Math.ceil(tick_time * 0.025),
          launch_tick: tick_time,
        },
      },
      {
        title: "mid_range_drone",
        description: "mid_range_drone_description",
        data: {
          moving_tick: Math.ceil(tick_time * 0.083333334),
          pre_activate_tick: Math.ceil(tick_time * 0.5),
        },
      },
      {
        title: "scout_drone",
        description: "scout_drone_description",
        data: {
          moving_tick: Math.ceil(tick_time * 0.083333334),
          pre_activate_tick: Math.ceil(tick_time * 0.4),
        },
      },
    ],
  },
  {
    category: "transport",
    topics: [
      {
        title: "logistics_car",
        description: "logistics_car_description",
        data: {
          reload_tick: tick_time,
          infantry_tick: Math.ceil(tick_time * 0.5),
          station_tick: Math.ceil(tick_time * 0.05),
          moving_tick: Math.ceil(tick_time * 0.25),
        },
      },
      {
        title: "rebman_car",
        description: "rebman_car_description",
        data: {
          reload_tick: tick_time,
          moving_tick: Math.ceil(tick_time * 0.25),
        },
      },
    ],
  },
  {
    category: "other",
    topics: [
      {
        title: "headquarter",
        description: "headquarter_description",
      },
      {
        title: "neutral_headquarter",
        description: "neutral_headquarter_description",
      },
      {
        title: "storage",
        description: "storage_description",
      },
      {
        title: "weather",
        description: "weather_description",
        data: {
          six_ticks: 6,
          eighteen_ticks: 18,
        },
      },
      {
        title: "satellite",
        description: "satellite_description",
        data: {
          photo_tick: Math.ceil(tick_time / 2),
          six_ticks: 6,
        },
      },
      {
        title: "topography",
        description: "topography_description",
      },
    ],
  },
];
