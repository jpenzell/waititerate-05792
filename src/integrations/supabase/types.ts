export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blind_spot_analysis: {
        Row: {
          category: string
          created_at: string | null
          detail: string
          icon: string | null
          id: string
          missed_perspective: string
          session_id: string
        }
        Insert: {
          category: string
          created_at?: string | null
          detail: string
          icon?: string | null
          id?: string
          missed_perspective: string
          session_id: string
        }
        Update: {
          category?: string
          created_at?: string | null
          detail?: string
          icon?: string | null
          id?: string
          missed_perspective?: string
          session_id?: string
        }
        Relationships: []
      }
      cognitive_reflection_responses: {
        Row: {
          ai_support_response: string | null
          created_at: string
          designing_response: string | null
          id: string
          session_id: string
          surprise_response: string | null
          user_id: string
        }
        Insert: {
          ai_support_response?: string | null
          created_at?: string
          designing_response?: string | null
          id?: string
          session_id: string
          surprise_response?: string | null
          user_id: string
        }
        Update: {
          ai_support_response?: string | null
          created_at?: string
          designing_response?: string | null
          id?: string
          session_id?: string
          surprise_response?: string | null
          user_id?: string
        }
        Relationships: []
      }
      datapoint_submissions: {
        Row: {
          created_at: string
          datapoint_text: string
          id: string
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          datapoint_text: string
          id?: string
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          datapoint_text?: string
          id?: string
          session_id?: string
          user_id?: string
        }
        Relationships: []
      }
      discovery_wall_responses: {
        Row: {
          created_at: string
          id: string
          response: string
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          response: string
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          response?: string
          session_id?: string
          user_id?: string
        }
        Relationships: []
      }
      inner_voice_responses: {
        Row: {
          created_at: string
          has_inner_voice: boolean
          id: string
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          has_inner_voice: boolean
          id?: string
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          has_inner_voice?: boolean
          id?: string
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inner_voice_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "presentation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      mental_imagery_responses: {
        Row: {
          created_at: string
          id: string
          session_id: string
          user_id: string
          vividness_score: number
        }
        Insert: {
          created_at?: string
          id?: string
          session_id: string
          user_id: string
          vividness_score: number
        }
        Update: {
          created_at?: string
          id?: string
          session_id?: string
          user_id?: string
          vividness_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "mental_imagery_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "presentation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      neurodiversity_quiz_responses: {
        Row: {
          created_at: string
          id: string
          population_guess: number
          productivity_guess: number
          session_id: string
          unemployment_guess: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          population_guess: number
          productivity_guess: number
          session_id: string
          unemployment_guess: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          population_guess?: number
          productivity_guess?: number
          session_id?: string
          unemployment_guess?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "neurodiversity_quiz_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "presentation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      numeric_estimates: {
        Row: {
          created_at: string
          estimate: number
          id: string
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          estimate: number
          id?: string
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          estimate?: number
          id?: string
          session_id?: string
          user_id?: string
        }
        Relationships: []
      }
      parking_lot_questions: {
        Row: {
          answered: boolean
          created_at: string
          id: string
          question: string
          session_id: string
          user_id: string
        }
        Insert: {
          answered?: boolean
          created_at?: string
          id?: string
          question: string
          session_id: string
          user_id: string
        }
        Update: {
          answered?: boolean
          created_at?: string
          id?: string
          question?: string
          session_id?: string
          user_id?: string
        }
        Relationships: []
      }
      pattern_submissions: {
        Row: {
          created_at: string
          id: string
          pattern_text: string
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          pattern_text: string
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          pattern_text?: string
          session_id?: string
          user_id?: string
        }
        Relationships: []
      }
      photo_exercise_phase: {
        Row: {
          ai_datapoint_count: number | null
          ai_datapoint_details: string | null
          ai_patterns: string | null
          current_phase: string
          id: string
          session_id: string
          updated_at: string
        }
        Insert: {
          ai_datapoint_count?: number | null
          ai_datapoint_details?: string | null
          ai_patterns?: string | null
          current_phase?: string
          id?: string
          session_id: string
          updated_at?: string
        }
        Update: {
          ai_datapoint_count?: number | null
          ai_datapoint_details?: string | null
          ai_patterns?: string | null
          current_phase?: string
          id?: string
          session_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      photo_submissions: {
        Row: {
          created_at: string
          id: string
          photo_data: string | null
          photo_url: string | null
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          photo_data?: string | null
          photo_url?: string | null
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          photo_data?: string | null
          photo_url?: string | null
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "photo_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      poll_responses: {
        Row: {
          answer: string
          created_at: string
          id: string
          poll_id: string
          user_id: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          poll_id: string
          user_id: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          poll_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "poll_responses_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
        ]
      }
      polls: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          options: Json
          question: string
          session_id: string
          slide_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          options: Json
          question: string
          session_id: string
          slide_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          options?: Json
          question?: string
          session_id?: string
          slide_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "polls_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "presentation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      presentation_sessions: {
        Row: {
          created_at: string
          current_slide_id: string
          id: string
          is_active: boolean | null
          presenter_id: string
          session_code: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_slide_id: string
          id?: string
          is_active?: boolean | null
          presenter_id: string
          session_code: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_slide_id?: string
          id?: string
          is_active?: boolean | null
          presenter_id?: string
          session_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      probability_word_responses: {
        Row: {
          created_at: string
          id: string
          percentage: number
          session_id: string
          user_id: string
          word: string
        }
        Insert: {
          created_at?: string
          id?: string
          percentage: number
          session_id: string
          user_id: string
          word: string
        }
        Update: {
          created_at?: string
          id?: string
          percentage?: number
          session_id?: string
          user_id?: string
          word?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      sensory_processing_responses: {
        Row: {
          brightness: number
          created_at: string
          felt_overwhelming: boolean
          id: string
          session_id: string
          sound_level: number
          user_id: string
          visual_intensity: number
        }
        Insert: {
          brightness: number
          created_at?: string
          felt_overwhelming: boolean
          id?: string
          session_id: string
          sound_level: number
          user_id: string
          visual_intensity: number
        }
        Update: {
          brightness?: number
          created_at?: string
          felt_overwhelming?: boolean
          id?: string
          session_id?: string
          sound_level?: number
          user_id?: string
          visual_intensity?: number
        }
        Relationships: [
          {
            foreignKeyName: "sensory_processing_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "presentation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      time_perception_responses: {
        Row: {
          actual_seconds: number
          created_at: string
          id: string
          session_id: string
          target_seconds: number
          user_id: string
        }
        Insert: {
          actual_seconds: number
          created_at?: string
          id?: string
          session_id: string
          target_seconds?: number
          user_id: string
        }
        Update: {
          actual_seconds?: number
          created_at?: string
          id?: string
          session_id?: string
          target_seconds?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_perception_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "presentation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_presenter_role: { Args: { _password: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "presenter" | "participant"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["presenter", "participant"],
    },
  },
} as const
