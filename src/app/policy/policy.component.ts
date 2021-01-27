import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { PolicyService } from '../_services';
import { IPolicy } from '../_models';

@Component({
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  pageTitle: string = 'Policy List';
  policies: IPolicy[] = [];
  errorMessage: string = '';
  p: number = 1;
  loading: boolean = false;
  faCheck = faCheck;
  faTimes = faTimes;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private policyService: PolicyService
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.loading = true;
      this.getPolicies(param);
    }
  }

  getPolicies(id: string): void {
    this.policyService.getPolicies().subscribe({
      next: policies => {
        this.policies = policies.policies.filter(p => p.clientId === id);
        this.loading = false;
      },
      error: err => (this.errorMessage = err)
    });
  }

  onBack(): void {
    this.router.navigate(['/users']);
  }
}
