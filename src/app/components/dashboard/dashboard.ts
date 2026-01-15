import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ChartType } from 'chart.js';
import { MoodService } from '../../services/mood/mood';
import { MoodEntry } from '../../models/mood';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnChanges {

  @Input() month!: number; // 0-11
  @Input() year!: number;

  // Moods
  moodCounts: number[] = [];
  moodLabels: string[] = ["😄 Muy feliz","🙂 Feliz","😌 Tranquilo","😐 Neutral","😣 Estresado","😢 Triste"];
  moodColors: string[] = ["#4CAF50","#8BC34A","#2196F3","#9E9E9E","#FF9800","#F44336"];
  chartData: any;
  chartType: ChartType = 'doughnut';
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Tags
  availableTags: string[] = ["🏋️‍♂️","📚","👥","🎮","🛌🏼","☀️","🌧️"];
  tagCounts: number[] = [];
  tagChartData: any;
  tagChartType: ChartType = 'bar';

  // Mood medio mensual
  averageMood: number = 0;

  constructor(private moodService: MoodService) {}

  ngOnInit(): void {
    this.updateStats();

    this.moodService.moodChanged$.subscribe(() => {
      this.updateStats();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateStats();
  }

  // Actualiza todas las estadísticas
  updateStats() {
    if (this.month === undefined || this.year === undefined) return;

    const moods = this.moodService.getAllMoods().filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === this.month && entryDate.getFullYear() === this.year;
    });

    this.calculateMoodStats(moods);
    this.calculateTagStats(moods);
    this.calculateAverageMood(moods);
  }

  // Calcula distribución de moods
  calculateMoodStats(moods: MoodEntry[]) {
    const counts: number[] = [0,0,0,0,0,0];
    moods.forEach(m => {
      switch(m.mood) {
        case "😄": counts[0]++; break;
        case "🙂": counts[1]++; break;
        case "😌": counts[2]++; break;
        case "😐": counts[3]++; break;
        case "😣": counts[4]++; break;
        case "😢": counts[5]++; break;
      }
    });
    this.moodCounts = counts;
    this.chartData = { labels: this.moodLabels, datasets: [{ data: this.moodCounts, backgroundColor: this.moodColors, borderColor: '#323135ff', borderWidth: 2 }] };
  }

  // Calcula frecuencia de tags
  calculateTagStats(moods: MoodEntry[]) {
    this.tagCounts = this.availableTags.map(() => 0);
    moods.forEach(entry => {
      entry.tags.forEach(tag => {
        const index = this.availableTags.indexOf(tag);
        if (index > -1) this.tagCounts[index]++;
      });
    });
    this.tagChartData = { labels: this.availableTags, datasets: [{ data: this.tagCounts, label: 'Tags', backgroundColor: '#6179ffff' }] };
  }

  public tagChartOptions = {
    responsive: true,
    scales: { y: { grid: { color: '#2d2c30ff', lineWidth: 2 } },
                x: { grid: {color: '#2d2c30ff', lineWidth: 2} }
    },
    maintainAspectRatio: false,
  };

  // Calcula mood medio mensual
  calculateAverageMood(moods: MoodEntry[]) {
    if (moods.length === 0) {
      this.averageMood = 0;
      return;
    }
    const moodValues: Record<string, number> = { "😄":6,"🙂":5,"😌":4,"😐":3,"😣":2,"😢":1 };
    const total = moods.reduce((sum, m) => sum + moodValues[m.mood], 0);
    this.averageMood = +(total / moods.length).toFixed(2);
  }

  getMonthName(month: number): string {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return monthNames[month] || "";
  }
}

