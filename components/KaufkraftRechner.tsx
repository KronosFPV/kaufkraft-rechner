'use client'
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
food: {
    name: 'Lebensmittel',
    rate: 0.035,
    weight: 0.15,
    subcategories: [
      { name: 'Grundnahrungsmittel', increase: '35%', details: 'Brot, Milch, etc.' },
      { name: 'Frischprodukte', increase: '42%', details: 'Gemüse, Obst, Fleisch' },
      { name: 'Restaurant', increase: '38%', details: 'Durchschnittliches Menü' }
    ]
  },
  utilities: {
    name: 'Energie & Versicherungen',
    rate: 0.06,
    weight: 0.08,
    subcategories: [
      { name: 'Stromkosten', increase: '45%', details: 'Pro kWh' },
      { name: 'Hausratversicherung', increase: '28%', details: 'Durchschnittliche Prämie' },
      { name: 'Internet/Telefon', increase: '15%', details: 'Bei mehr Leistung' }
    ]
  },
  leisure: {
    name: 'Freizeit & Urlaub',
    rate: 0.05,
    weight: 0.12,
    subcategories: [
      { name: 'Skitickets', increase: '55%', details: 'Tageskarten' },
      { name: 'Hotelübernachtungen', increase: '42%', details: 'Durchschnittspreis CH' },
      { name: 'Flugreisen', increase: '38%', details: 'Inkl. neue Abgaben' },
      { name: 'Freizeitanlagen', increase: '32%', details: 'Fitness, Schwimmbad etc.' }
    ]
  },
  services: {
    name: 'Dienstleistungen',
    rate: 0.045,
    weight: 0.08,
    subcategories: [
      { name: 'Handwerker', increase: '35%', details: 'Stundensätze' },
      { name: 'Coiffeur', increase: '28%', details: 'Durchschnittspreis' },
      { name: 'Reinigung', increase: '25%', details: 'Chemische Reinigung' }
    ]
  }
};

const KaufkraftRechner = () => {
  const [startYear, setStartYear] = useState(2013);
  const [salary, setSalary] = useState(7000);
  const [bonus, setBonus] = useState(0);
  const [endYear, setEndYear] = useState(2025);
  const [results, setResults] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [salaryType, setSalaryType] = useState('monthly12');
  const [includeBonus, setIncludeBonus] = useState(false);

  const calculateInflation = () => {
    let yearlyBaseSalary;
    
    switch(salaryType) {
      case 'yearly':
        yearlyBaseSalary = salary;
        break;
      case 'monthly12':
        yearlyBaseSalary = salary * 12;
        break;
      case 'monthly13':
        yearlyBaseSalary = salary * 13;
        break;
      default:
        yearlyBaseSalary = salary * 12;
    }

    if (includeBonus) {
      yearlyBaseSalary += bonus;
    }

    const weighted_inflation = Object.values(detailedCategories)
      .reduce((acc, category) => acc + (category.rate * category.weight), 0);

    const years = endYear - startYear;
    const adjusted_yearly_salary = yearlyBaseSalary * Math.pow((1 + weighted_inflation), years);
    
    let adjusted_salary;
    switch(salaryType) {
      case 'yearly':
        adjusted_salary = adjusted_yearly_salary;
        break;
      case 'monthly12':
        adjusted_salary = adjusted_yearly_salary / 12;
        break;
      case 'monthly13':
        adjusted_salary = adjusted_yearly_salary / 13;
        break;
      default:
        adjusted_salary = adjusted_yearly_salary / 12;
    }

    const categories = Object.entries(detailedCategories).map(([key, cat]) => {
      const initial = yearlyBaseSalary * cat.weight;
      const final = initial * Math.pow((1 + cat.rate), years);
      return {
        name: cat.name,
        initial: initial.toFixed(2),
        final: final.toFixed(2),
        difference: (final - initial).toFixed(2),
        percentageIncrease: ((final/initial - 1) * 100).toFixed(1),
        subcategories: cat.subcategories
      };
    });

    setResults({
      originalSalary: salary,
      adjustedSalary: adjusted_salary,
      yearlyInflation: weighted_inflation * 100,
      totalIncrease: ((adjusted_yearly_salary/yearlyBaseSalary - 1) * 100),
      categories
    });
    setShowDetails(true);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Realer Kaufkraft-Rechner Schweiz
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">1. Ursprungsjahr</label>
              <input
                type="number"
                min="1990"
                max="2024"
                value={startYear}
                onChange={(e) => setStartYear(Number(e.target.value))}
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">2. Lohn Ursprungsjahr (CHF)</label>
              <div className="space-y-4">
                <input
                  type="number"
                  min="0"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="p-2 border rounded w-full"
                  placeholder="Lohn eingeben"
                />
                
                <div className="space-y-2">
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={salaryType === 'yearly'}
                        onChange={() => setSalaryType('yearly')}
                        name="salaryType"
                        className="rounded border-gray-300"
                      />
                      Jahreslohn
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={salaryType === 'monthly12'}
                        onChange={() => setSalaryType('monthly12')}
                        name="salaryType"
                        className="rounded border-gray-300"
                      />
                      12 Monatslöhne
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={salaryType === 'monthly13'}
                        onChange={() => setSalaryType('monthly13')}
                        name="salaryType"
                        className="rounded border-gray-300"
                      />
                      13 Monatslöhne
                    </label>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeBonus}
                        onChange={(e) => setIncludeBonus(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      Bonus einrechnen
                    </label>

                    {includeBonus && (
                      <div className="mt-2 pl-6">
                        <input
                          type="number"
                          min="0"
                          value={bonus}
                          onChange={(e) => setBonus(Number(e.target.value))}
                          className="p-2 border rounded w-full"
                          placeholder="Bonus pro Jahr eingeben"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">3. Zieljahr</label>
              <input
                type="number"
                min="1990"
                max="2025"
                value={endYear}
                onChange={(e) => setEndYear(Number(e.target.value))}
                className="p-2 border rounded"
              />
            </div>

            <Button 
              onClick={calculateInflation}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              disabled={startYear >= endYear}
            >
              Berechnen
            </Button>
          </div>

          {showDetails && results && (
            <div className="mt-6 space-y-6">
              <Alert className="bg-yellow-50">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-medium text-lg">
                    Um die gleiche Kaufkraft wie CHF {results.originalSalary.toFixed(2)} 
                    {salaryType === 'yearly' ? ' pro Jahr' : ` pro Monat (${salaryType === 'monthly13' ? '13x' : '12x'})`}
                    {includeBonus ? ` plus Bonus von CHF ${bonus.toFixed(2)}` : ''} im Jahr {startYear} zu haben,
                    müssten Sie {endYear} CHF {results.adjustedSalary.toFixed(2)} 
                    {salaryType === 'yearly' ? ' pro Jahr' : ` pro Monat (${salaryType === 'monthly13' ? '13x' : '12x'})`}
                    {includeBonus ? ` plus angepassten Bonus von CHF ${(bonus * Math.pow((1 + results.yearlyInflation/100), endYear - startYear)).toFixed(2)}` : ''} verdienen!
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Das entspricht einer Erhöhung von {results.totalIncrease.toFixed(1)}% über {endYear - startYear} Jahre
                    (durchschnittlich {results.yearlyInflation.toFixed(2)}% pro Jahr)
                  </div>
                </AlertDescription>
              </Alert>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Detaillierte Kostenentwicklung:</h3>
                {results.categories.map((category, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-lg">{category.name}</h4>
                      <span className="text-sm bg-blue-100 px-2 py-1 rounded">
                        +{category.percentageIncrease}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      Kosten {startYear}: CHF {category.initial} → {endYear}: CHF {category.final}
                    </div>
                    <div className="space-y-2">
                      {category.subcategories.map((sub, subIdx) => (
                        <div key={subIdx} className="bg-white p-3 rounded border">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{sub.name}</span>
                            <span className="text-sm text-gray-600">+{sub.increase}</span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{sub.details}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KaufkraftRechner;
