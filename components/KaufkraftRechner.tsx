import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const detailedCategories = {
  housing: {
    name: 'Wohnen & Immobilien',
    rate: 0.058,
    weight: 0.30,
    subcategories: [
      { name: 'Eigenheim', increase: '85%', details: 'Von ~700k auf ~1.3M CHF' },
      { name: 'Mieten', increase: '45%', details: 'Besonders in Städten' },
      { name: 'Nebenkosten', increase: '38%', details: 'Strom, Wasser, Heizung' }
    ]
  },
  transport: {
    name: 'Transport & Mobilität',
    rate: 0.055,
    weight: 0.15,
    subcategories: [
      { name: 'Benzinpreise', increase: '42%', details: 'Von ~1.65 auf ~2.35 CHF/L' },
      { name: 'Autopreise', increase: '35%', details: 'Durchschnittlicher Neuwagen' },
      { name: 'ÖV-Tickets', increase: '28%', details: 'GA & Einzeltickets' },
      { name: 'Autoversicherung', increase: '25%', details: 'Durchschnittliche Prämien' }
    ]
  },
  health: {
    name: 'Gesundheit',
    rate: 0.04,
    weight: 0.12,
    subcategories: [
      { name: 'Krankenkasse', increase: '48%', details: 'Grundversicherung' },
      { name: 'Zahnarzt', increase: '32%', details: 'Behandlungskosten' },
      { name: 'Medikamente', increase: '25%', details: 'Nicht kassenpflichtige' }
    ]
  },
